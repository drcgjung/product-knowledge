import fetch from 'node-fetch';
import { RequestInit } from 'node-fetch';
import createHttpsProxyAgent from 'https-proxy-agent';
import { HttpsProxyAgent } from 'https-proxy-agent';

// a ontology hub factory
export interface IOntologyHubFactory {
  create: () => IOntologyHub;
}

//OntologyHub Interface
export interface IOntologyHub {
  getOntologies: () => Promise<OntologyResult[]>;
}

interface Ontology {
  name: string;
  download_url: string;
}

type OntologyContainer = Array<Ontology>;

interface OntologyResult {
  name: string;
  download_url: string;
  vowl: string;
}

class OntologyHub implements IOntologyHub {
  private url: string;
  private proxy?: HttpsProxyAgent;

  constructor(url: string, proxy: string) {
    this.url = url;
    if (proxy) {
      this.proxy = createHttpsProxyAgent(proxy);
    }
  }
  public async getOntologies(): Promise<OntologyResult[]> {
    const response = await fetch(this.url, { agent: this.proxy });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    } else {
      const body = (await response.json()) as OntologyContainer;
      const result: OntologyResult[] = [];
      body.forEach((ontology) => {
        if (ontology.name.includes('_ontology')) {
          const ontolgyName = ontology.name.replace('.ttl', '');
          let items: string[] = ontolgyName.split('_');
          items = items.map((item) => {
            if (item.length < 3) return item.toUpperCase();
            else return item.charAt(0).toUpperCase() + item.slice(1);
          });
          const ontolgyTitle = items.join(' ');
          const entry: OntologyResult = {
            name: ontolgyTitle,
            download_url: ontology.download_url,
            vowl: ontology.download_url
              .replace('.ttl', '.json')
              .replace(ontolgyName, ontolgyName + '_vowl'),
          };
          result.push(entry);
        }
      });

      return result;
    }
  }
}

class MockOntologyHub implements IOntologyHub {
  public getOntologies(): Promise<OntologyResult[]> {
    return Promise.resolve([
      {
        name: 'Address Ontology',
        download_url:
          'https://raw.githubusercontent.com/catenax-ng/product-knowledge/main/ontology/address_ontology.ttl',
        vowl: 'https://raw.githubusercontent.com/catenax-ng/product-knowledge/main/ontology/address_ontology_vowl.json',
      },
      {
        name: 'Common Ontology',
        download_url:
          'https://raw.githubusercontent.com/catenax-ng/product-knowledge/main/ontology/common_ontology.ttl',
        vowl: 'https://raw.githubusercontent.com/catenax-ng/product-knowledge/main/ontology/common_ontology_vowl.json',
      },
      {
        name: 'Contact Ontology',
        download_url:
          'https://raw.githubusercontent.com/catenax-ng/product-knowledge/main/ontology/contact_ontology.ttl',
        vowl: 'https://raw.githubusercontent.com/catenax-ng/product-knowledge/main/ontology/contact_ontology_vowl.json',
      },
      {
        name: 'CX Ontology',
        download_url:
          'https://raw.githubusercontent.com/catenax-ng/product-knowledge/main/ontology/cx_ontology.ttl',
        vowl: 'https://raw.githubusercontent.com/catenax-ng/product-knowledge/main/ontology/cx_ontology_vowl.json',
      },
      {
        name: 'Diagnosis Ontology',
        download_url:
          'https://raw.githubusercontent.com/catenax-ng/product-knowledge/main/ontology/diagnosis_ontology.ttl',
        vowl: 'https://raw.githubusercontent.com/catenax-ng/product-knowledge/main/ontology/diagnosis_ontology_vowl.json',
      },
      {
        name: 'Encoding Ontology',
        download_url:
          'https://raw.githubusercontent.com/catenax-ng/product-knowledge/main/ontology/encoding_ontology.ttl',
        vowl: 'https://raw.githubusercontent.com/catenax-ng/product-knowledge/main/ontology/encoding_ontology_vowl.json',
      },
      {
        name: 'Error Ontology',
        download_url:
          'https://raw.githubusercontent.com/catenax-ng/product-knowledge/main/ontology/error_ontology.ttl',
        vowl: 'https://raw.githubusercontent.com/catenax-ng/product-knowledge/main/ontology/error_ontology_vowl.json',
      },
      {
        name: 'Load Spectrum Ontology',
        download_url:
          'https://raw.githubusercontent.com/catenax-ng/product-knowledge/main/ontology/load_spectrum_ontology.ttl',
        vowl: 'https://raw.githubusercontent.com/catenax-ng/product-knowledge/main/ontology/load_spectrum_ontology_vowl.json',
      },
      {
        name: 'Material Ontology',
        download_url:
          'https://raw.githubusercontent.com/catenax-ng/product-knowledge/main/ontology/material_ontology.ttl',
        vowl: 'https://raw.githubusercontent.com/catenax-ng/product-knowledge/main/ontology/material_ontology_vowl.json',
      },
      {
        name: 'Part Ontology',
        download_url:
          'https://raw.githubusercontent.com/catenax-ng/product-knowledge/main/ontology/part_ontology.ttl',
        vowl: 'https://raw.githubusercontent.com/catenax-ng/product-knowledge/main/ontology/part_ontology_vowl.json',
      },
      {
        name: 'Person Ontology',
        download_url:
          'https://raw.githubusercontent.com/catenax-ng/product-knowledge/main/ontology/person_ontology.ttl',
        vowl: 'https://raw.githubusercontent.com/catenax-ng/product-knowledge/main/ontology/person_ontology_vowl.json',
      },
      {
        name: 'Prognosis Ontology',
        download_url:
          'https://raw.githubusercontent.com/catenax-ng/product-knowledge/main/ontology/prognosis_ontology.ttl',
        vowl: 'https://raw.githubusercontent.com/catenax-ng/product-knowledge/main/ontology/prognosis_ontology_vowl.json',
      },
      {
        name: 'Vehicle Component Ontology',
        download_url:
          'https://raw.githubusercontent.com/catenax-ng/product-knowledge/main/ontology/vehicle_component_ontology.ttl',
        vowl: 'https://raw.githubusercontent.com/catenax-ng/product-knowledge/main/ontology/vehicle_component_ontology_vowl.json',
      },
      {
        name: 'Vehicle Information Ontology',
        download_url:
          'https://raw.githubusercontent.com/catenax-ng/product-knowledge/main/ontology/vehicle_information_ontology.ttl',
        vowl: 'https://raw.githubusercontent.com/catenax-ng/product-knowledge/main/ontology/vehicle_information_ontology_vowl.json',
      },
      {
        name: 'Vehicle Lifecycle Ontology',
        download_url:
          'https://raw.githubusercontent.com/catenax-ng/product-knowledge/main/ontology/vehicle_lifecycle_ontology.ttl',
        vowl: 'https://raw.githubusercontent.com/catenax-ng/product-knowledge/main/ontology/vehicle_lifecycle_ontology_vowl.json',
      },
      {
        name: 'Vehicle Ontology',
        download_url:
          'https://raw.githubusercontent.com/catenax-ng/product-knowledge/main/ontology/vehicle_ontology.ttl',
        vowl: 'https://raw.githubusercontent.com/catenax-ng/product-knowledge/main/ontology/vehicle_ontology_vowl.json',
      },
      {
        name: 'Vehicle Safety Ontology',
        download_url:
          'https://raw.githubusercontent.com/catenax-ng/product-knowledge/main/ontology/vehicle_safety_ontology.ttl',
        vowl: 'https://raw.githubusercontent.com/catenax-ng/product-knowledge/main/ontology/vehicle_safety_ontology_vowl.json',
      },
      {
        name: 'Vehicle Usage Ontology',
        download_url:
          'https://raw.githubusercontent.com/catenax-ng/product-knowledge/main/ontology/vehicle_usage_ontology.ttl',
        vowl: 'https://raw.githubusercontent.com/catenax-ng/product-knowledge/main/ontology/vehicle_usage_ontology_vowl.json',
      },
    ]);
  }
}

// class of IOntologyHubFactory
// creates MockOntologyHub or OntologyHub
export class EnvironmentOntologyHubFactory implements IOntologyHubFactory {
  private environmentOntologyHub: IOntologyHub;

  constructor() {
    if (
      process.env.REACT_APP_SKILL_GITHUB_ONTOLOGYHUB != undefined &&
      process.env.REACT_APP_SKILL_PROXY != undefined
    ) {
      this.environmentOntologyHub = new OntologyHub(
        process.env.REACT_APP_SKILL_GITHUB_ONTOLOGYHUB,
        process.env.REACT_APP_SKILL_PROXY
      );
    } else {
      this.environmentOntologyHub = new MockOntologyHub();
    }
  }

  public create() {
    return this.environmentOntologyHub;
  }
}

//global factory variable
const ontologHubFactory: IOntologyHubFactory =
  new EnvironmentOntologyHubFactory();

/**
 * @returns the global connector factory
 */
export const getOntologyHubFactory = function () {
  return ontologHubFactory;
};
