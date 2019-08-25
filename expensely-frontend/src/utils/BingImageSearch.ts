import ImageSearchAPIClient from 'azure-cognitiveservices-imagesearch';
import * as Azure from 'ms-rest-azure';

export const BingImageSearch = async (searchQuery: string) => {

  const serviceKey: string = 'ffd5a277062541f8850a76fe7a555d5f';

  const credentials = new Azure.CognitiveServicesCredentials(serviceKey);
  const imageSearchApiClient = new ImageSearchAPIClient(credentials);

  const imageResults = await imageSearchApiClient.imagesOperations.search(searchQuery);
  if (imageResults === null) {
    return null;
  } else {
    return imageResults.value[0].thumbnailUrl;
  }
};