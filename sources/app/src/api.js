import { studioConfig } from './settings';
import { SearchClient } from '@craftercms/sdk/lib/craftercms';
import { EngineClient } from '@craftercms/sdk/lib/craftercms';

const engineClient = new EngineClient(studioConfig.baseUrl, studioConfig.site);
const contentStoreService = engineClient.contentStoreService;
const navService = engineClient.navigationService;

const searchClient = new SearchClient(studioConfig.baseUrl, studioConfig.site);
const searchService = searchClient.searchService;

export { 
  contentStoreService, 
  navService,
  searchService
} ;
