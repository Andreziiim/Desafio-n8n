import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
    NodeOperationError,
} from 'n8n-workflow';

import axios from 'axios';

// Função alternativa para isInteger caso ES6 não esteja disponível
function isInteger(n: number): boolean {
    return typeof n === 'number' && isFinite(n) && Math.floor(n) === n;
}

export class Random implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Random',
        name: 'random',
        icon: 'file:random.svg',
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["operation"]}}',
        description: 'Generate true random numbers using Random.org API',
        defaults: {
            name: 'Random',
        },
        inputs: ['main'],
        outputs: ['main'],
        properties: [
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                options: [
                    {
                        name: 'True Random Number Generator',
                        value: 'generateRandomNumber',
                        description: 'Generate a true random number',
                        action: 'Generate a true random number',
                    },
                ],
                default: 'generateRandomNumber',
            },
            {
                displayName: 'Minimum Value',
                name: 'min',
                type: 'number',
                default: 1,
                description: 'The minimum value (inclusive)',
                displayOptions: {
                    show: {
                        operation: ['generateRandomNumber'],
                    },
                },
            },
            {
                displayName: 'Maximum Value',
                name: 'max',
                type: 'number',
                default: 100,
                description: 'The maximum value (inclusive)',
                displayOptions: {
                    show: {
                        operation: ['generateRandomNumber'],
                    },
                },
            },
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];
        const operation = this.getNodeParameter('operation', 0) as string;

        for (let i = 0; i < items.length; i++) {
            try {
                if (operation === 'generateRandomNumber') {
                    const min = this.getNodeParameter('min', i) as number;
                    const max = this.getNodeParameter('max', i) as number;

                    if (min >= max) {
                        throw new NodeOperationError(
                            this,
                            'Minimum value must be less than maximum value',
                        );
                    }

                    if (!isInteger(min) || !isInteger(max)) {
                        throw new NodeOperationError(
                            this,
                            'Both minimum and maximum values must be integers',
                        );
                    }

                    const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;
                    
                    const response = await axios.get(url, {
                        timeout: 10000,
                    });

                    const randomNumber = parseInt(response.data.trim(), 10);

                    if (isNaN(randomNumber)) {
                        throw new NodeOperationError(
                            this,
                            'Failed to generate a valid random number',
                        );
                    }

                    returnData.push({
                        json: {
                            randomNumber,
                            min,
                            max,
                            timestamp: new Date().toISOString(),
                            source: 'Random.org',
                        },
                        pairedItem: {
                            item: i,
                        },
                    });
                }
            } catch (error: any) {
                if (this.continueOnFail()) {
                    returnData.push({
                        json: {
                            error: error?.message ?? error?.toString(),
                        },
                        pairedItem: {
                            item: i,
                        },
                    });
                    continue;
                }
                throw error;
            }
        }

        return [returnData];
    }
}