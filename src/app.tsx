import * as H from 'history';
import * as queryString from 'query-string';
import {analyticsEvent} from './util/analytics';
import {Changelog} from './changelog';
import {DataSourceEnum, SourceSelection} from './datasource/data_source';
import {Details} from './details/details';
import {EmbeddedDataSource, EmbeddedSourceSpec} from './datasource/embedded';
import {FormattedMessage, injectIntl, WrappedComponentProps} from 'react-intl';
import {getI18nMessage} from './util/error_i18n';
import {IndiInfo} from 'topola';
import {Intro} from './intro';
import {Loader, Message, Portal, Tab} from 'semantic-ui-react';
import {Media} from './util/media';
import {Redirect, Route, RouteComponentProps, Switch} from 'react-router-dom';
import {TopBar} from './menu/top_bar';
import {TopolaData} from './util/gedcom_util';
import {useEffect, useState} from 'react';
import {
  Chart,
  ChartType,
  downloadPdf,
  downloadPng,
  downloadSvg,
  printChart,
} from './chart';
import {
  argsToConfig,
  Config,
  ConfigPanel,
  configToArgs,
  DEFALUT_CONFIG,
} from './config';
import {
  getSelection,
  UploadSourceSpec,
  UrlSourceSpec,
  GedcomUrlDataSource,
  UploadedDataSource,
} from './datasource/load_data';
import {
  loadWikiTree,
  PRIVATE_ID_PREFIX,
  WikiTreeDataSource,
  WikiTreeSourceSpec,
} from './datasource/wikitree';

/** Shows an error message in the middle of the screen. */
function ErrorMessage(props: {message?: string}) {
  return (
    <Message negative className="error">
      <Message.Header>
        <FormattedMessage
          id="error.failed_to_load_file"
          defaultMessage={'Failed to load file'}
        />
      </Message.Header>
      <p>{props.message}</p>
    </Message>
  );
}

interface ErrorPopupProps {
  message?: string;
  open: boolean;
  onDismiss: () => void;
}

/**
 * Shows a dismissable error message in the bottom left corner of the screen.
 */
function ErrorPopup(props: ErrorPopupProps) {
  return (
    <Portal open={props.open} onClose={props.onDismiss}>
      <Message negative className="errorPopup" onDismiss={props.onDismiss}>
        <Message.Header>
          <FormattedMessage id="error.error" defaultMessage={'Error'} />
        </Message.Header>
        <p>{props.message}</p>
      </Message>
    </Portal>
  );
}

enum AppState {
  INITIAL,
  LOADING,
  ERROR,
  SHOWING_CHART,
  LOADING_MORE,
}

type DataSourceSpec =
  | UrlSourceSpec
  | UploadSourceSpec
  | WikiTreeSourceSpec
  | EmbeddedSourceSpec;

/**
 * Arguments passed to the application, primarily through URL parameters.
 * Non-optional arguments get populated with default values.
 */
interface Arguments {
  sourceSpec?: DataSourceSpec;
  selection?: IndiInfo;
  chartType: ChartType;
  standalone: boolean;
  freezeAnimation?: boolean;
  showSidePanel: boolean;
  config: Config;
}

/**
 * Retrieve arguments passed into the application through the URL and uploaded
 * data.
 */
function getArguments(location: H.Location<any>): Arguments {
  const search = queryString.parse(location.search);
  const getParam = (name: string) => {
    const value = search[name];
    return typeof value === 'string' ? value : undefined;
  };

  const view = getParam('view');
  const chartTypes = new Map<string | undefined, ChartType>([
    ['relatives', ChartType.Relatives],
    ['fancy', ChartType.Fancy],
  ]);

  const hash = getParam('file');
  const url = getParam('url');
  const embedded = getParam('embedded') === 'true'; // False by default.
  var sourceSpec: DataSourceSpec | undefined = undefined;
  if (getParam('source') === 'wikitree') {
    sourceSpec = {
      source: DataSourceEnum.WIKITREE,
      authcode: getParam('?authcode'),
    };
  } else if (hash) {
    sourceSpec = {
      source: DataSourceEnum.UPLOADED,
      hash,
      gedcom: location.state && location.state.data,
      images: location.state && location.state.images,
    };
  } else if (url) {
    sourceSpec = {
      source: DataSourceEnum.GEDCOM_URL,
      url,
      handleCors: getParam('handleCors') !== 'false', // True by default.
    };
  } else if (embedded) {
    sourceSpec = {source: DataSourceEnum.EMBEDDED};
  }

  const indi = getParam('indi');
  const parsedGen = Number(getParam('gen'));
  const selection = indi
    ? {id: indi, generation: !isNaN(parsedGen) ? parsedGen : 0}
    : undefined;

  return {
    sourceSpec,
    selection,
    // Hourglass is the default view.
    chartType: chartTypes.get(view) || ChartType.Hourglass,

    showSidePanel: getParam('sidePanel') !== 'false', // True by default.
    standalone: getParam('standalone') !== 'false' && !embedded,
    freezeAnimation: getParam('freeze') === 'true', // False by default
    config: argsToConfig(search),
  };
}

/**
 * Returs true if the changes object has values that are different than those
 * in state.
 */
function hasUpdatedValues<T>(state: T, changes: Partial<T> | undefined) {
  if (!changes) {
    return false;
  }
  return Object.entries(changes).some(
    ([key, value]) => value !== undefined && state[key] !== value,
  );
}

function AppComponent(props: RouteComponentProps & WrappedComponentProps) {
  /** State of the application. */
  const [state, setState] = useState<AppState>(AppState.INITIAL);
  /** Loaded data. */
  const [data, setData] = useState<TopolaData>();
  /** Selected individual. */
  const [selection, setSelection] = useState<IndiInfo>();
  /** Error to display. */
  const [error, setError] = useState<string>();
  /** Whether the side panel is shown. */
  const [showSidePanel, setShowSidePanel] = useState(false);
  /** Whether the app is in standalone mode, i.e. showing 'open file' menus. */
  const [standalone, setStandalone] = useState(true);
  /** Type of displayed chart. */
  const [chartType, setChartType] = useState<ChartType>(ChartType.Hourglass);
  /** Whether to show the error popup. */
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  /** Specification of the source of the data. */
  const [sourceSpec, setSourceSpec] = useState<DataSourceSpec>();
  /** Freeze animations after initial chart render. */
  const [freezeAnimation, setFreezeAnimation] = useState(false);
  const [config, setConfig] = useState(DEFALUT_CONFIG);

  /** Sets the state with a new individual selection and chart type. */
  function updateDisplay(newSelection: IndiInfo) {
    if (
      !selection ||
      selection.id !== newSelection.id ||
      selection!.generation !== newSelection.generation
    ) {
      setSelection(newSelection);
    }
  }

  /** Sets error message after data load failure. */
  function setErrorMessage(message: string) {
    setError(message);
    setState(AppState.ERROR);
  }

  const uploadedDataSource = new UploadedDataSource();
  const gedcomUrlDataSource = new GedcomUrlDataSource();
  const wikiTreeDataSource = new WikiTreeDataSource(props.intl);
  const embeddedDataSource = new EmbeddedDataSource();

  function isNewData(newSourceSpec: DataSourceSpec, newSelection?: IndiInfo) {
    if (!sourceSpec || sourceSpec.source !== newSourceSpec.source) {
      // New data source means new data.
      return true;
    }
    const newSource = {spec: newSourceSpec, selection: newSelection};
    const oldSouce = {
      spec: sourceSpec,
      selection: selection,
    };
    switch (newSource.spec.source) {
      case DataSourceEnum.UPLOADED:
        return uploadedDataSource.isNewData(
          newSource as SourceSelection<UploadSourceSpec>,
          oldSouce as SourceSelection<UploadSourceSpec>,
          data,
        );
      case DataSourceEnum.GEDCOM_URL:
        return gedcomUrlDataSource.isNewData(
          newSource as SourceSelection<UrlSourceSpec>,
          oldSouce as SourceSelection<UrlSourceSpec>,
          data,
        );
      case DataSourceEnum.WIKITREE:
        return wikiTreeDataSource.isNewData(
          newSource as SourceSelection<WikiTreeSourceSpec>,
          oldSouce as SourceSelection<WikiTreeSourceSpec>,
          data,
        );
      case DataSourceEnum.EMBEDDED:
        return embeddedDataSource.isNewData(
          newSource as SourceSelection<EmbeddedSourceSpec>,
          oldSouce as SourceSelection<EmbeddedSourceSpec>,
          data,
        );
    }
  }

  function loadData(newSourceSpec: DataSourceSpec, newSelection?: IndiInfo) {
    switch (newSourceSpec.source) {
      case DataSourceEnum.UPLOADED:
        return uploadedDataSource.loadData({
          spec: newSourceSpec,
          selection: newSelection,
        });
      case DataSourceEnum.GEDCOM_URL:
        return gedcomUrlDataSource.loadData({
          spec: newSourceSpec,
          selection: newSelection,
        });
      case DataSourceEnum.WIKITREE:
        return wikiTreeDataSource.loadData({
          spec: newSourceSpec,
          selection: newSelection,
        });
      case DataSourceEnum.EMBEDDED:
        return embeddedDataSource.loadData({
          spec: newSourceSpec,
          selection: newSelection,
        });
    }
  }

  useEffect(() => {
    (async () => {
      if (props.location.pathname !== '/view') {
        if (state !== AppState.INITIAL) {
          setState(AppState.INITIAL);
        }
        return;
      }

      const args = getArguments(props.location);

      if (!args.sourceSpec) {
        props.history.replace({pathname: '/'});
        return;
      }

      if (
        state === AppState.INITIAL ||
        isNewData(args.sourceSpec, args.selection)
      ) {
        // Set loading state.
        setState(AppState.LOADING);
        // Set state from URL parameters.
        setSourceSpec(args.sourceSpec);
        setSelection(args.selection);
        setStandalone(args.standalone);
        setChartType(args.chartType);
        setConfig(args.config);
        try {
          const data = await loadData(args.sourceSpec, args.selection);
          // Set state with data.
          setData(data);
          setSelection(getSelection(data.chartData, args.selection));
          setShowSidePanel(args.showSidePanel);
          setState(AppState.SHOWING_CHART);
        } catch (error: any) {
          setErrorMessage(getI18nMessage(error, props.intl));
        }
      } else if (
        state === AppState.SHOWING_CHART ||
        state === AppState.LOADING_MORE
      ) {
        // Update selection if it has changed in the URL.
        const newSelection = getSelection(data!.chartData, args.selection);
        const loadMoreFromWikitree =
          args.sourceSpec.source === DataSourceEnum.WIKITREE &&
          (!selection || selection.id !== newSelection.id);
        setChartType(args.chartType);
        setState(
          loadMoreFromWikitree ? AppState.LOADING_MORE : AppState.SHOWING_CHART,
        );
        updateDisplay(newSelection);
        if (loadMoreFromWikitree) {
          try {
            const data = await loadWikiTree(args.selection!.id, props.intl);
            const newSelection = getSelection(data.chartData, args.selection);
            setData(data);
            setSelection(newSelection);
            setState(AppState.SHOWING_CHART);
          } catch (error: any) {
            setState(AppState.SHOWING_CHART);
            displayErrorPopup(
              props.intl.formatMessage(
                {
                  id: 'error.failed_wikitree_load_more',
                  defaultMessage: 'Failed to load data from WikiTree. {error}',
                },
                {error},
              ),
            );
          }
        }
      }
    })();
  });

  function updateUrl(args: queryString.ParsedQuery<any>) {
    const location = props.location;
    const search = queryString.parse(location.search);
    for (const key in args) {
      search[key] = args[key];
    }
    location.search = queryString.stringify(search);
    props.history.push(location);
  }

  /**
   * Called when the user clicks an individual box in the chart.
   * Updates the browser URL.
   */
  function onSelection(selection: IndiInfo) {
    // Don't allow selecting WikiTree private profiles.
    if (selection.id.startsWith(PRIVATE_ID_PREFIX)) {
      return;
    }
    analyticsEvent('selection_changed');
    updateUrl({
      indi: selection.id,
      gen: selection.generation,
    });
  }

  function onPrint() {
    analyticsEvent('print');
    printChart();
  }

  function displayErrorPopup(message: string) {
    setShowErrorPopup(true);
    setError(message);
  }

  async function onDownloadPdf() {
    analyticsEvent('download_pdf');
    try {
      await downloadPdf();
    } catch (e) {
      displayErrorPopup(
        props.intl.formatMessage({
          id: 'error.failed_pdf',
          defaultMessage:
            'Failed to generate PDF file.' +
            ' Please try with a smaller diagram or download an SVG file.',
        }),
      );
    }
  }

  async function onDownloadPng() {
    analyticsEvent('download_png');
    try {
      await downloadPng();
    } catch (e) {
      displayErrorPopup(
        props.intl.formatMessage({
          id: 'error.failed_png',
          defaultMessage:
            'Failed to generate PNG file.' +
            ' Please try with a smaller diagram or download an SVG file.',
        }),
      );
    }
  }

  function onDownloadSvg() {
    analyticsEvent('download_svg');
    downloadSvg();
  }

  function onDismissErrorPopup() {
    setShowErrorPopup(false);
  }

  function renderMainArea() {
    switch (state) {
      case AppState.SHOWING_CHART:
      case AppState.LOADING_MORE:
        const sidePanelTabs = [
          {
            menuItem: props.intl.formatMessage({
              id: 'tab.info',
              defaultMessage: 'Info',
            }),
            render: () => (
              <Details gedcom={data!.gedcom} indi={selection!.id} />
            ),
          },
          {
            menuItem: props.intl.formatMessage({
              id: 'tab.settings',
              defaultMessage: 'Settings',
            }),
            render: () => (
              <ConfigPanel
                config={config}
                onChange={(config) => {
                  setConfig(config);
                  updateUrl(configToArgs(config));
                }}
              />
            ),
          },
        ];
        return (
          <div id="content">
            <ErrorPopup
              open={showErrorPopup}
              message={error}
              onDismiss={onDismissErrorPopup}
            />
            {state === AppState.LOADING_MORE ? (
              <Loader active size="small" className="loading-more" />
            ) : null}
            <Chart
              data={data!.chartData}
              selection={selection!}
              chartType={chartType}
              onSelection={onSelection}
              freezeAnimation={freezeAnimation}
              colors={config.color}
            />
            {showSidePanel ? (
              <Media greaterThanOrEqual="large" className="sidePanel">
                <Tab panes={sidePanelTabs} />
              </Media>
            ) : null}
            <Changelog />
          </div>
        );

      case AppState.ERROR:
        return <ErrorMessage message={error!} />;

      case AppState.INITIAL:
      case AppState.LOADING:
        return <Loader active size="large" />;
    }
  }

  return (
    <>
      <Route
        render={(props: RouteComponentProps) => (
          <TopBar
            {...props}
            data={data?.chartData}
            allowAllRelativesChart={
              sourceSpec?.source !== DataSourceEnum.WIKITREE
            }
            showingChart={
              props.history.location.pathname === '/view' &&
              (state === AppState.SHOWING_CHART ||
                state === AppState.LOADING_MORE)
            }
            standalone={standalone}
            eventHandlers={{
              onSelection,
              onPrint,
              onDownloadPdf,
              onDownloadPng,
              onDownloadSvg,
            }}
            showWikiTreeMenus={sourceSpec?.source === DataSourceEnum.WIKITREE}
          />
        )}
      />
      <Switch>
        <Route exact path="/" component={Intro} />
        <Route exact path="/view" render={renderMainArea} />
        <Redirect to={'/'} />
      </Switch>
    </>
  );
}

export const App = injectIntl(AppComponent);
