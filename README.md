
# Documentação do Código de Geração de Relatórios PDF

## Introdução

Este código foi desenvolvido para atender a uma necessidade específica de geração de relatórios em formato PDF, seguindo um padrão estabelecido. Ele utiliza a biblioteca `pdfkit` para criar e personalizar documentos PDF, incorporando funcionalidades como inserção de imagens, textos formatados e estruturação de páginas com diferentes layouts.

----------

## Estrutura do Código

### 1. Interfaces Definidas

O código utiliza as seguintes interfaces para modelar os dados que serão usados no relatório:

#### `Package`

Representa os pacotes gerados no relatório.

-   `archive_name`: Nome do arquivo.
-   `size`: Tamanho do arquivo (em MB).
-   `type`: Tipo do arquivo.
-   `hash`: Lista de hashes do arquivo.

#### `Imagem`

Representa as informações de imagens capturadas.

-   `archive_name`: Nome do arquivo da imagem.
-   `path`: Caminho da imagem.
-   `date`: Data de captura.
-   `origin`: Origem da imagem.

#### `Video`

Contém detalhes sobre vídeos capturados.

-   `archive_name`: Nome do arquivo.
-   `hash`: Hash do vídeo.
-   `start_time`: Horário de início.
-   `end_time`: Horário de término.
-   `duration`: Duração do vídeo (em segundos).

#### `URL`

Representa URLs capturadas.

-   `link`: Link da URL.
-   `owner`: Proprietário.
-   `ip_address`: Endereço IP.
-   `created_at`: Data de criação.

#### `Historico`

Histórico de acessos a URLs.

-   `datetime`: Data e hora do acesso.
-   `url`: Objeto do tipo `URL`.

----------

### 2. Classe Principal: `GenerateReport`

Esta classe gerencia a criação de relatórios PDF com diferentes seções e layouts.

#### **Construtor**

Inicia o documento PDF e configura a página inicial com informações básicas:

-   Identificador.
-   Título.
-   Responsável.
-   Inclusão de logotipo centralizado.

#### **Métodos**

##### `introductionPage()`

Adiciona uma página de introdução ao documento com um texto explicativo.

##### `certificationPage(qrcode_path: string, code: string)`

Adiciona uma página de certificação contendo:

-   QR Code para validação online.
-   Código de validação.
-   Informações importantes sobre a integridade do documento.

##### `registerDetails(id: string, start_date: string, end_date: string, session_time: number, utf: string, ambiente: string, packages: Package[])`

Adiciona uma página detalhando o registro da sessão:

-   Identificador.
-   Datas de início e fim.
-   Tempo de sessão.
-   Fuso horário e ambiente.
-   Lista de pacotes gerados com hashes.

##### `addImage(image: Imagem)`

Adiciona uma nova página no layout "paisagem" para exibir imagens de tela com informações detalhadas (nome do arquivo, data e origem).

##### `videoAndHistoryDetails(videos: Video[], historico: Historico[])`

Adiciona uma página para detalhes de vídeos, histórico e URLs acessadas durante a sessão.

-   Informações de cada vídeo.
-   URLs registradas com data/hora, proprietário e IP.

##### `generate()`

Gera o arquivo PDF final consolidando todas as páginas criadas.

----------

## Funcionalidades Implementadas

1.  **Personalização do Layout**: O código permite alinhar imagens e textos centralizados na página.
2.  **Seções Estruturadas**: Páginas para introdução, certificação, detalhes de registros, imagens e histórico.
3.  **Suporte a Dados Estruturados**: Uso de interfaces para garantir a consistência dos dados.

----------

## Como Utilizar

### Exemplo Completo de Uso:

```javascript
// EXECUÇÃO DO PDF:

const meu_relatorio = new GenerateReport('./relatorio.pdf', '090503', 'Relatório de organização dos periféricos', 'Lucas L. Schimidt'); // Construtor
meu_relatorio.introductionPage(); // Página da introdução
meu_relatorio.certificationPage('./assets/qr_code.png','193j1e98u12eh1982u3912dh1'); // Página do QR Code e identificador

const pacote_um = {
  archive_name: 'capture_6711396f6336070c.zip',
  size: 13.74,
  type: 'Conteúdos capturados', 
  hash: ['09a8sdasnd12uh3jasd', 'asjsi45645uhuh9283190823']}; 

meu_relatorio.registerDetails('90123j1209ujed182ji123', '2024-04-03', '2024-04-07', 200, '(UTC-03:00) Brasilia','WEBSITE - Ponto(s) de acesso à internet: 45.170.27.220',[pacote_um]);

const iagem_um = {archive_name: 'minha_imagem.png', path: './assets/captura.png', date: '2024-12-24', origin: 'desktop'};
meu_relatorio.addImage(imagem_um);

const video_um = {archive_name: 'meu_video.mp4', hash: '1928321hsd1hge129873ghdjhga', start_time:'00:00:00', end_time:'00:25:52', duration: 300};
const video_dois = {archive_name: 'meu_video_2.mp4', hash: '1928321hsdasd1hge129873ghdjhga', start_time:'00:00:00', end_time:'00:03:11', duration: 300};

const historico_um = {url: {link: 'https://google.com', created_at: '2008-05-10', ip_address:'192.168.0.0', owner:'Google'}, datetime: '2024-12-24 00:00:00'};
const historico_dois = {url: {link: 'https://google.com', created_at: '2008-05-10', ip_address:'192.168.0.0', owner:'Google'}, datetime: '2024-12-24 00:00:00'};
const historico_tres = {url: {link: 'https://google.com', created_at: '2008-05-10', ip_address:'192.168.0.0', owner:'Google'}, datetime: '2024-12-24 00:00:00'};
const historico = [historico_um, historico_dois, historico_tres];

meu_relatorio.videoAndHistoryDetails([video_um, video_dois], historico);

meu_relatorio.generate();

```

----------

## Considerações Finais

Este código fornece uma base robusta para gerar relatórios PDF personalizados como foi solicitado no projeto. Se precisar de qualquer ajuste ou alteração, sinta-se livre para me contactar!