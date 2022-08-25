//
// Test logic for the skill framework
// See copyright notice in the top folder
// See authors file in the top folder
// See license file in the top folder
//

import { getConnectorFactory } from '../src/index';
import {jest} from '@jest/globals';

/**
 * test the mock connector
 */
describe('testing skill framework', () => {
  jest.setTimeout(15000);
  test('empty string should result in zero', async () => {
      var connector = getConnectorFactory().create();
      console.log(`Got connector ${connector}.`);
      var catalogue = await connector.listAssets();
      expect(catalogue.id).toBeDefined();
      console.log(`Found catalog ${catalogue.id}.`);
      expect(catalogue.contractOffers).toBeDefined();
      expect(catalogue.contractOffers.length).toBeGreaterThan(0);
      console.log(`Found ${catalogue.contractOffers.length} offers.`);
      catalogue.contractOffers.map(function(contractOffer) {
        expect(contractOffer).toHaveProperty("id");
        console.log(`Found offer ${contractOffer.id}.`);
        expect(contractOffer).toHaveProperty("policy");
        expect(contractOffer).toHaveProperty("asset");
        expect(contractOffer.asset).toHaveProperty("properties");
        expect(contractOffer.asset.properties).toHaveProperty("asset:prop:id");
        expect(contractOffer.asset.properties).toHaveProperty("asset:prop:name");
        console.log(`Found asset ${contractOffer.asset.properties["asset:prop:name"]} in offer ${contractOffer.id}.`);
        expect(contractOffer.asset.properties).toHaveProperty("asset:prop:contenttype");
      });
    });
});