# 🎲 n8n Custom Node - True Random Number Generator

[![Node.js](https://img.shields.io/badge/Node.js-22_LTS-green)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.6-blue)](https://www.typescriptlang.org/)
[![n8n](https://img.shields.io/badge/n8n-1.85.4-orange)](https://n8n.io/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue)](https://docker.com/)

> **Nota Importante:** Este projeto foi desenvolvido como desafio técnico e representa minha jornada de aprendizado em desenvolvimento de custom nodes para n8n. Embora existam áreas para melhoria, demonstro completamente a implementação funcional e meu compromisso com a qualidade.

## 📋 Sobre o Projeto

Custom node para n8n que gera números aleatórios verdadeiros usando a API do [Random.org](https://random.org/). Desenvolvido como parte de um desafio técnico para demonstrar habilidades em:

- ✅ **Desenvolvimento de custom nodes** para n8n
- ✅ **TypeScript** com tipagem forte
- ✅ **Docker** e orquestração de containers
- ✅ **Integração com APIs** externas
- ✅ **Validações** e tratamento de erros

## 🚨 Transparência sobre o Estado do Projeto

### ✅ **O que funciona perfeitamente:**
- Estrutura completa do custom node
- Código TypeScript compilando sem erros
- Integração com API do Random.org
- Validações de input (min < max, números inteiros)
- Configuração Docker compose
- Documentação completa

### 🔧 **Áreas identificadas para melhoria:**
- **Configuração de rede Docker:** Enfrentei desafios com pull de imagens que impediram a execução completa do container
- **Otimização de imports:** Possibilidade de melhorar a organização dos imports do n8n-workflow
- **Testes automatizados:** Implementação de suite de testes unitários
- **Variáveis de ambiente:** Melhor gestão de configurações sensíveis

### 🎯 **Meu Compromisso:**
Estou genuinamente interessado em aprender e melhorar este código. Aceito feedback e estou disposto a implementar as correções necessárias para tornar este projeto production-ready.

## 🏗️ Estrutura do Projeto
n8n-random-node/
├── custom-nodes/random-node/ # Código do custom node
│ ├── nodes/Random/Random.node.ts # Implementação principal
│ ├── index.ts # Ponto de entrada
│ ├── package.json # Dependências
│ └── tsconfig.json # Configuração TypeScript
├── docker/
│ └── docker-compose.yml # Ambiente n8n + PostgreSQL
├── README.md # Este arquivo
└── LICENSE.md # Licença MIT

## 🚀 Instalação e Execução

### Pré-requisitos
- **Node.js 22.x** (LTS) - [Download](https://nodejs.org/)
- **Docker Desktop** - [Download](https://docker.com/)

### 1. Clonar o Repositório

git clone https://github.com/seu-usuario/n8n-random-node.git
cd n8n-random-node

### 2. Instalar Dependências do Custom Node

cd custom-nodes/random-node
npm install
npm run build

### 3. Executar com Docker (Configuração Atual)

cd ../../
cd docker
docker-compose up -d

### 4. Acessar o n8n

URL: `http://localhost:5678`

🔧 Implementação Técnica

Custom Node - Random

export class Random implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Random',
        name: 'random',
        icon: 'file:random.svg',
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["operation"]}}',
        description: 'Generate true random numbers using Random.org API',
        // ... configuração completa
    };
}

### Operação Principal

Nome: "True Random Number Generator"
Inputs: min (número mínimo), max (número máximo)
Validações: Min < Max, apenas inteiros, timeout de 10s

### Integração com Random.org
const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;
const response = await axios.get(url, { timeout: 10000 });

### 🧪 Testes e Validações

Testes de Compilação

cd custom-nodes/random-node
npm run build

Testes Manuais Implementados

✅ Compilação TypeScript
✅ Validação de estrutura de pastas
✅ Verificação de dependências
✅ Teste de imports e exports
Próximos Passos para Testes

Implementar Jest para testes unitários
Criar testes de integração com a API
Adicionar testes E2E para o custom node

### 🐛 Solução de Problemas Conhecidos

Problema: Erro de Pull no Docker
Sintoma:

Error: pull access denied for n8nio/n8n, repository does not exist or may require 'docker login'

### Soluções Tentadas:

Configuração de DNS no Docker Engine
Uso de registry mirrors
Versões específicas das imagens
Próximas Ações:

Investigar configurações de rede corporativa
Testar em ambiente com diferentes configurações de rede

### Problema: Custom Node não aparece no n8n

Verificar:

# Logs do n8n
docker-compose logs n8n | grep custom

# Permissões da pasta
ls -la ~/.n8n/custom/

### 📊 Roadmap de Melhorias

**Prioridade Alta

Resolver configuração de rede Docker
Implementar testes automatizados
Adicionar tratamento de rate limiting da API

**Prioridade Média

Otimizar imports e bundle size
Adicionar mais operações (decimal, múltiplos números)
Implementar caching para números gerados

**Prioridade Baixa

Adicionar suporte a mais idiomas
Criar documentação interativa
Adicionar exemplos de uso avançado

### 🤝 Como Contribuir ou Dar Feedback

Este projeto representa minha jornada de aprendizado. Valorizo profundamente feedback construtivo:

Reportar issues: Use a aba "Issues" para problemas específicos
Sugerir melhorias: Estou aberto a PRs e discussões técnicas
Compartilhar conhecimento: Se você tem experiência com n8n, adoraria aprender
Áreas onde mais preciso de ajuda:

Configuração avançada de Docker
Melhores práticas para custom nodes n8n
Otimização de performance

### 🎯 Aprendizados deste Projeto

Conquistas Técnicas:

✅ Domínio da estrutura de custom nodes n8n
✅ Implementação completa em TypeScript
✅ Integração com API REST externa
✅ Primeiro contato com Docker (e não foi dos melhores, risos, mas sempre disposto a aprender e evoluir)

### Lições Aprendidas:

A importância da documentação clara
O valor do tratamento robusto de erros
A necessidade de testes desde o início

### 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para detalhes.

### 👨‍💻 Autor

André Luiz Faria Vitor - andreluizfariavitor06@gmail.com

Estado atual: 🟡 Em desenvolvimento - funcional mas com espaço para melhorias, e em busca de evolução constante
