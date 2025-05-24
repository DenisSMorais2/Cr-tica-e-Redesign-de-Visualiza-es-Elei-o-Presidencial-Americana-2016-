#🗺️ Análise Crítica de Visualização: Eleição Presidencial EUA 2016
Este projeto realiza uma análise crítica de uma visualização amplamente utilizada para representar os resultados da eleição presidencial dos Estados Unidos de 2016. A partir dessa análise, são identificadas falhas visuais e propostas alternativas de redesign que comunicam os dados de forma mais precisa e informativa.

##📌 Objetivo
Avaliar uma visualização real utilizada na mídia, identificando problemas de codificação visual, ausência de contexto e distorções na representação dos dados. Propor redesigns que sigam boas práticas de visualização de dados.

##🧐 Visualização Original
.Tipo: Mapa coroplético dos Estados Unidos
.Codificação:
    .Cor vermelha = estados vencidos por Republicanos
    .Cor azul = estados vencidos por Democratas
    .Intensidade baseada em percentuais (em alguns casos)

.Problemas identificados:
    .Área visual dos estados distorce a percepção da vitória
    .Ignora número de votos eleitorais
    .Representa apenas o vencedor por estado, ignorando margens
    .Falta de legenda com dados quantitativos
    .Não reflete o sistema do colégio eleitoral
    
![USA](https://github.com/user-attachments/assets/3eb5708c-6df3-4005-a03c-102612f29c70)

##❌ Falhas Comuns Identificadas
.Tirania da Geografia: Área ≠ Importância eleitoral
.Binário Enganoso: Falta de nuance nas margens de vitória
.Vácuo Informacional: Ausência de contexto numérico e legendas
.Desconexão Sistêmica: Ignora o funcionamento do sistema eleitoral

##✅ Redesigns Propostos
1. Mapa Cartográfico Proporcional
.Tamanho dos estados ajustado pelos votos eleitorais
.Gradiente de cor indica a margem de vitória
.Mantém a forma geral do mapa

2. Visualização Híbrida: Treemap + Barras
.Cada retângulo representa um estado
.Tamanho proporcional aos votos eleitorais
.Cor e intensidade mostram partido e margem de vitória
.Barras laterais com totais nacionais

📐 Diretrizes de Visualização
.Proporcionalidade visual é essencial
.Gradientes de cor são preferíveis ao binário
.Legendas e escalas numéricas devem ser incluídas
.A visualização deve refletir o sistema político em questão
.Se possível, oferecer múltiplas perspectivas

![Grafico_EU](https://github.com/user-attachments/assets/175a3db9-afda-44cc-adce-b1b712e8deee)

##🚀 Como Rodar o Projeto
1. Certifique-se de ter o Node.js instalado.
2. Instale um servidor local (como o Live Server no VS Code).
3. Abra `Redesign.js` com um HTML de suporte, ou inclua-o em um projeto com HTML básico.
4. Visualize os redesigns diretamente no navegador.
