// Assuming you are using ES modules (type: "module" in package.json)

import { readFile } from 'fs/promises';
import YAML from 'yaml';

export const path = '.../../rules.yaml';

async function loadYamlFile(filePath: string): Promise<any> {
    try{
  const fileContent = await readFile(filePath, 'utf8');
  const data = YAML.parse(fileContent);
  return data;
    }
    catch (error) {
        console.error('Error reading YAML:',error);
    }
}

export {loadYamlFile};