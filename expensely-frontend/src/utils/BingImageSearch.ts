import ImageSearchAPIClient from 'azure-cognitiveservices-imagesearch';
import * as Azure from 'ms-rest-azure';
// import { Images } from 'azure-cognitiveservices-imagesearch/lib/models';

export const BingImageSearch = async (searchQuery: string) => {

  const serviceKey: string = 'ffd5a277062541f8850a76fe7a555d5f';

  const credentials = new Azure.CognitiveServicesCredentials(serviceKey);
  const imageSearchApiClient = new ImageSearchAPIClient(credentials);

  const imageResults = await imageSearchApiClient.imagesOperations.search(searchQuery);
  if (imageResults === null) {
    return null;
  } else {
    console.log(imageResults.value[0].thumbnailUrl);
    return imageResults.value[0].thumbnailUrl;
  }
};