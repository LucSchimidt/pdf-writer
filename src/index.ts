// index.ts

// Importa a classe GenerateReport como padrão
import GenerateReport from "./GenerateReport";

// Importa as interfaces de seus respectivos arquivos, ajuste os caminhos conforme necessário
import { Package, Imagem, Video, URL, Historico } from "./GenerateReport";

// Exporta a classe GenerateReport como padrão e as interfaces como exportações nomeadas
export default GenerateReport;
export { Package, Imagem, Video, URL, Historico };