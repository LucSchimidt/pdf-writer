"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pdfkit_1 = __importDefault(require("pdfkit"));
const fs_1 = __importDefault(require("fs"));
class GenerateReport {
    //Classe para geração da capa e definição do arquivo PDF.
    constructor(filePath, id, title, responsable) {
        this.doc = new pdfkit_1.default();
        const writeStream = fs_1.default.createWriteStream(filePath);
        this.doc.pipe(writeStream);
        const imageWidth = 250;
        const pageWidth = this.doc.page.width;
        const xPosition = (pageWidth - imageWidth) / 2;
        this.doc.image('./assets/logo.png', xPosition, 0, { fit: [250, 250], align: 'center' });
        this.doc.moveDown();
        this.doc.moveDown();
        this.doc.moveDown();
        this.doc.moveDown();
        this.doc.moveDown();
        this.doc.moveDown();
        this.doc.fillColor('#4B5563');
        this.doc.fontSize(32).text('Relatório de captura técnica de conteúdo digital');
        this.doc.moveDown();
        this.doc.fillColor('black');
        this.doc.font('Helvetica-Bold');
        this.doc.fontSize(12).text('Identificador:');
        this.doc.fillColor('#4B5563');
        this.doc.font('Helvetica');
        this.doc.fontSize(16).text(`${id}`);
        this.doc.moveDown();
        this.doc.fillColor('black');
        this.doc.font('Helvetica-Bold');
        this.doc.fontSize(12).text('Título:');
        this.doc.fillColor('#4B5563');
        this.doc.font('Helvetica');
        this.doc.fontSize(16).text(`${title}`);
        this.doc.moveDown();
        this.doc.fillColor('black');
        this.doc.font('Helvetica-Bold');
        this.doc.fontSize(12).text('Responsável:');
        this.doc.fillColor('#4B5563');
        this.doc.font('Helvetica');
        this.doc.fontSize(16).text(`${responsable}`);
        this.doc.moveDown();
        const smallImageWidth = 125;
        const smallXPosition = (pageWidth - smallImageWidth) / 2;
        const imageHeight = 125;
        const pageHeight = this.doc.page.height;
        const yPosition = pageHeight - imageHeight - this.doc.page.margins.bottom + 50;
        this.doc.image('./assets/logo.png', smallXPosition, yPosition, { fit: [125, 125], align: 'center', valign: 'bottom' });
    }
    //Gera a página de introdução do relatório:
    introductionPage(introduction) {
        const content = `${introduction}`;
        this.doc.addPage();
        this.doc.font('Helvetica-Bold');
        this.doc.fontSize(16).text('Introdução:');
        this.doc.fillColor('#4B5563');
        this.doc.font('Helvetica');
        this.doc.fontSize(12).text(`${content}`);
        const imageWidth = 125;
        const pageWidth = this.doc.page.width;
        const xPosition = (pageWidth - imageWidth) / 2;
        const imageHeight = 125;
        const pageHeight = this.doc.page.height;
        const yPosition = pageHeight - imageHeight - this.doc.page.margins.bottom + 50;
        this.doc.image('./assets/logo.png', xPosition, yPosition, { fit: [125, 125], align: 'center', valign: 'bottom' });
    }
    //Gera a página de certificados, QR Code e código:
    certificationPage(qrcode_path, code, validation_url) {
        this.doc.addPage();
        let start_y = 100;
        //Bloco da certificação:
        this.doc.font('Helvetica-Bold');
        this.doc.fontSize(16).text('Certificação:', 75, start_y);
        start_y = start_y + 25;
        this.doc.fillColor('#4B5563');
        this.doc.font('Helvetica');
        this.doc.fontSize(10).text('* As assinaturas certificadas constam no documento digital original somente. Modificações ou a impressão do documento podem inviabilizar sua validação, veja mais no item 3 deste documento.', 75, start_y);
        //Bloco do qrcode e do código:
        start_y = start_y + 50;
        this.doc.font('Helvetica-Bold');
        this.doc.fillColor('black');
        this.doc.fontSize(16).text('Validador Online:', 75, start_y);
        start_y = start_y + 25;
        this.doc.fillColor('#4B5563');
        this.doc.font('Helvetica');
        this.doc.fontSize(12).text('Validação dos códigos HASH e existência do registro:', 75, start_y);
        start_y = start_y + 50;
        let qr_code_size = 125;
        this.doc.image(`${qrcode_path}`, 75, start_y, { fit: [qr_code_size, qr_code_size] });
        this.doc.text(`${code}`, qr_code_size + 100, start_y);
        start_y = start_y + qr_code_size + 25;
        this.doc.fillColor('#4B5563');
        this.doc.font('Helvetica');
        this.doc.fontSize(10).text(`A validação de integridade dos arquivos pode ser feita de forma facilitada no link abaixo:`, 75, start_y);
        start_y = start_y + 25;
        this.doc.fontSize(12).text(`${validation_url}`, 75, start_y, { link: `${validation_url}` });
        //Bloco do Importante:
        start_y = start_y + 50;
        this.doc.fillColor('black');
        this.doc.font('Helvetica-Bold');
        this.doc.fontSize(16).text('Importante:', 75, start_y);
        start_y = start_y + 25;
        this.doc.fillColor('#4B5563');
        this.doc.font('Helvetica');
        this.doc.fontSize(12).text('É necessário que cada parte que receba este relatório faça uma verificação deste registro em nosso validador online, verificando a integridade deste documento e outros arquivos anexados. Caso algum arquivo não seja validado corretamente ou o relatório conste como INVÁLIDO, recomendamos que sejam desconsiderados dos autos.', 75, start_y);
        this.doc.moveDown();
        const imageWidth = 125;
        const pageWidth = this.doc.page.width;
        const xPosition = (pageWidth - imageWidth) / 2;
        const imageHeight = 125;
        const pageHeight = this.doc.page.height;
        const yPosition = pageHeight - imageHeight - this.doc.page.margins.bottom + 50;
        this.doc.image('./assets/logo.png', xPosition, yPosition, { fit: [125, 125], align: 'center', valign: 'bottom' });
    }
    //Gera a página de detalhes de registro:
    registerDetails(details) {
        this.doc.addPage();
        //Bloco dos detalhes:
        this.doc.font('Helvetica-Bold');
        this.doc.fontSize(16).text('Detalhes do registro:');
        this.doc.moveDown();
        //Identificador:
        let start_y = 100;
        this.doc.fillColor('#4B5563');
        this.doc.font('Helvetica-Bold');
        this.doc.fontSize(12).text(`Identificador:`, 75, start_y);
        this.doc.fillColor('#4B5563');
        this.doc.font('Helvetica');
        this.doc.fontSize(12).text(`${details.id}`);
        this.doc.moveDown();
        //Horarios:
        start_y = start_y + 50;
        this.doc.font('Helvetica-Bold');
        this.doc.fontSize(12).text(`Data inicial:`, 75, start_y);
        this.doc.fillColor('#4B5563');
        this.doc.font('Helvetica');
        this.doc.fontSize(12).text(`${details.start_date}`);
        this.doc.font('Helvetica-Bold');
        this.doc.fontSize(12).text(`Data final:`, 225, start_y);
        this.doc.fillColor('#4B5563');
        this.doc.font('Helvetica');
        this.doc.fontSize(12).text(`${details.end_date}`);
        this.doc.font('Helvetica-Bold');
        this.doc.fontSize(12).text(`Tempo de sessão:`, 375, start_y);
        this.doc.fillColor('#4B5563');
        this.doc.font('Helvetica');
        this.doc.fontSize(12).text(`${details.session_time}`);
        this.doc.moveDown();
        //UTF:
        start_y = start_y + 50;
        this.doc.font('Helvetica-Bold');
        this.doc.fontSize(12).text(`Fuso horário definido pelo responsável (Zona GMT):`, 75, start_y);
        this.doc.fillColor('#4B5563');
        this.doc.font('Helvetica');
        this.doc.fontSize(12).text(`${details.utf}`);
        //Ambiente:
        start_y = start_y + 50;
        this.doc.font('Helvetica-Bold');
        this.doc.fontSize(12).text(`Ambiente:`, 75, start_y);
        this.doc.fillColor('#4B5563');
        this.doc.font('Helvetica');
        this.doc.fontSize(12).text(`${details.ambiente}`);
        //Pacotes gerados:
        start_y = start_y + 50;
        this.doc.font('Helvetica-Bold');
        this.doc.fontSize(12).text(`Pacotes gerados:`, 75, start_y);
        this.doc.fillColor('#4B5563');
        this.doc.font('Helvetica');
        for (let i = 0; i < details.packages.length; i++) {
            this.doc.fontSize(12).text(`${details.packages[i].archive_name} (${details.packages[i].size}MB) - ${details.packages[i].type}`);
            for (let j = 0; j < details.packages[i].hash.length; j++) {
                this.doc.fontSize(10).text(`${details.packages[i].hash[j]}`);
            }
        }
        //Imagens da tela:
        start_y = start_y + 75;
        this.doc.fillColor('black');
        this.doc.font('Helvetica-Bold');
        this.doc.fontSize(14).text('Imagens de tela:', 75, start_y);
        this.doc.moveDown();
        const imageWidth = 125;
        const pageWidth = this.doc.page.width;
        const xPosition = (pageWidth - imageWidth) / 2;
        const imageHeight = 125;
        const pageHeight = this.doc.page.height;
        const yPosition = pageHeight - imageHeight - this.doc.page.margins.bottom + 50;
        this.doc.image('./assets/logo.png', xPosition, yPosition, { fit: [125, 125], align: 'center', valign: 'bottom' });
    }
    //Cada addImage() gera uma página com uma imagem somente e os seus detalhes.
    addImage(image) {
        this.doc.addPage({ layout: 'landscape' });
        const pageHeight = this.doc.page.height;
        this.doc.fillColor('#4B5563');
        this.doc.font('Helvetica');
        this.doc.fontSize(12).text(`Arquivo: ${image.archive_name} - (${image.size} MB) - Registrado em: ${image.date}`);
        this.doc.fontSize(10).text(`Origem: ${image.origin}`, { link: `${image.origin_url}` });
        const resultado = image.hash
            .map((hash) => `HASH = ${hash}`)
            .join(', ');
        this.doc.fontSize(10).text(`${resultado}`);
        this.doc.moveDown();
        this.doc.image(image.path, { width: pageHeight, align: 'center' });
        const imageWidth = 125;
        const pageWidth = this.doc.page.width;
        const xPosition = (pageWidth - imageWidth) / 2;
        const imageHeight = 125;
        const yPosition = pageHeight - imageHeight - this.doc.page.margins.bottom + 50;
        this.doc.image('./assets/logo.png', xPosition, yPosition, { fit: [125, 125], align: 'center', valign: 'bottom' });
    }
    //Gera a página com os detalhes dos vídeos e das URL's acessadas:
    videoAndHistoryDetails(videos, historico) {
        this.doc.addPage({ layout: 'portrait' });
        //Detalhes dos vídeos:
        let start_y = 100;
        this.doc.fillColor('black');
        this.doc.font('Helvetica-Bold');
        this.doc.fontSize(14).text('Detalhes dos vídeos:', 75, start_y);
        this.doc.font('Helvetica');
        this.doc.fillColor('#4B5563');
        this.doc.fontSize(12).text('Vídeos registrados pelo usuário durante a sessão:');
        this.doc.moveDown();
        for (let i = 0; i < videos.length; i++) {
            this.doc.fillColor('#4B5563');
            this.doc.font('Helvetica-Bold');
            this.doc.fontSize(12).text(`${videos[i].archive_name}`);
            this.doc.font('Helvetica');
            this.doc.fontSize(10).text(`${videos[i].hash} | Início do vídeo: ${videos[i].start_time} - Fim do vídeo: ${videos[i].end_time}`);
            this.doc.fontSize(10).text(`Duração(s): ${videos[i].duration}`);
            this.doc.moveDown();
        }
        //Detalhes do histórico:
        this.doc.moveDown();
        this.doc.fillColor('black');
        this.doc.font('Helvetica-Bold');
        this.doc.fontSize(14).text('Details of the search history:');
        this.doc.font('Helvetica');
        this.doc.fillColor('#4B5563');
        this.doc.fontSize(12).text('Search history recorded by the user during the session:');
        this.doc.moveDown();
        for (let i = 0; i < historico.length; i++) {
            this.doc.fillColor('#4B5563');
            this.doc.font('Helvetica-Bold');
            this.doc.fontSize(12).text(`Date and time: ${historico[i].datetime}`);
            this.doc.font('Helvetica');
            this.doc.fontSize(12).text(`Access URL:: ${historico[i].url.link}`, { link: `${historico[i].url.link}` });
            this.doc.moveDown();
        }
        //Detalhes das URL's:
        this.doc.moveDown();
        this.doc.fillColor('black');
        this.doc.font('Helvetica-Bold');
        this.doc.fontSize(14).text("Details of the visited URLs:");
        this.doc.font('Helvetica');
        this.doc.fillColor('#4B5563');
        this.doc.fontSize(12).text('Details of each of the URLs visited by the user during the session');
        this.doc.moveDown();
        for (let i = 0; i < historico.length; i++) {
            this.doc.fillColor('#4B5563');
            this.doc.font('Helvetica-Bold');
            this.doc.fontSize(12).text(`URL: ${historico[i].url.link}`, { link: `${historico[i].url.link}` });
            this.doc.font('Helvetica');
            this.doc.fontSize(10).text(`Created at: ${historico[i].url.created_at} - Dono: ${historico[i].url.owner}`);
            this.doc.fontSize(10).text(`IP Address: ${historico[i].url.created_at}`);
            this.doc.moveDown();
        }
        const imageWidth = 125;
        const pageWidth = this.doc.page.width;
        const xPosition = (pageWidth - imageWidth) / 2;
        const imageHeight = 125;
        const pageHeight = this.doc.page.height;
        const yPosition = pageHeight - imageHeight - this.doc.page.margins.bottom + 50;
        this.doc.image('./assets/logo.png', xPosition, yPosition, { fit: [125, 125], align: 'center', valign: 'bottom' });
    }
    //Gera as páginas sobre a empresa:
    aboutPage(about_content) {
        this.doc.addPage({ layout: 'portrait' });
        let start_y = 100;
        this.doc.fillColor('black');
        this.doc.font('Helvetica-Bold');
        this.doc.fontSize(16).text('Sobre a REALDOC:', 75, start_y);
        this.doc.font('Helvetica');
        this.doc.fillColor('#4B5563');
        this.doc.fontSize(12).text(`${about_content.aboutRealDoc}`);
        this.doc.moveDown();
        this.doc.fillColor('black');
        this.doc.font('Helvetica-Bold');
        this.doc.fontSize(12).text('O ambiente de registro:');
        this.doc.font('Helvetica');
        this.doc.fillColor('#4B5563');
        this.doc.fontSize(12).text(`${about_content.registrationEnvironment}`);
        this.doc.moveDown();
        this.doc.fillColor('black');
        this.doc.font('Helvetica-Bold');
        this.doc.fontSize(12).text('Tipos de conteúdos registrados:');
        this.doc.font('Helvetica');
        this.doc.fillColor('#4B5563');
        this.doc.fontSize(12).text(`${about_content.registeredContentTypes}`);
        this.doc.moveDown();
        this.doc.fillColor('black');
        this.doc.font('Helvetica-Bold');
        this.doc.fontSize(12).text('Captura técnica de websites:');
        this.doc.font('Helvetica');
        this.doc.fillColor('#4B5563');
        this.doc.fontSize(12).text(`${about_content.websiteTechnicalCapture}`);
        this.doc.moveDown();
        this.doc.fillColor('black');
        this.doc.font('Helvetica-Bold');
        this.doc.fontSize(12).text('Integridade dos arquivos através de códigos HASH:');
        this.doc.font('Helvetica');
        this.doc.fillColor('#4B5563');
        this.doc.fontSize(12).text(`${about_content.fileIntegrityWithHashCodes}`);
        this.doc.moveDown();
        this.doc.fillColor('black');
        this.doc.font('Helvetica-Bold');
        this.doc.fontSize(12).text('Relatório PDF/A:');
        this.doc.font('Helvetica');
        this.doc.fillColor('#4B5563');
        this.doc.fontSize(12).text(`${about_content.pdfAReport}`);
        this.doc.moveDown();
        this.doc.fillColor('black');
        this.doc.font('Helvetica-Bold');
        this.doc.fontSize(12).text('Assinatura Digital e carimbo de tempo ICP/Brasil:');
        this.doc.font('Helvetica');
        this.doc.fillColor('#4B5563');
        this.doc.fontSize(12).text(`${about_content.digitalSignatureAndTimestampICP}`);
        this.doc.moveDown();
        this.doc.fillColor('black');
        this.doc.font('Helvetica-Bold');
        this.doc.fontSize(12).text('Serviços complementares:');
        this.doc.font('Helvetica');
        this.doc.fillColor('#4B5563');
        this.doc.fontSize(12).text(`${about_content.complementaryServices}`);
        this.doc.moveDown();
        this.doc.fillColor('black');
        this.doc.font('Helvetica-Bold');
        this.doc.fontSize(12).text('Escopo e objeto de registro:');
        this.doc.font('Helvetica');
        this.doc.fillColor('#4B5563');
        this.doc.fontSize(12).text(`${about_content.registrationScopeAndObject}`);
        this.doc.moveDown();
        this.doc.fillColor('black');
        this.doc.font('Helvetica-Bold');
        this.doc.fontSize(12).text('Segurança e conformidade de técnica:');
        this.doc.font('Helvetica');
        this.doc.fillColor('#4B5563');
        this.doc.fontSize(12).text(`${about_content.technicalSecurityAndCompliance}`);
        this.doc.moveDown();
        this.doc.fillColor('black');
        this.doc.font('Helvetica-Bold');
        this.doc.fontSize(16).text('Validação do Registro:');
        this.doc.font('Helvetica');
        this.doc.fillColor('#4B5563');
        this.doc.fontSize(12).text(`${about_content.registrationValidation}`);
        this.doc.moveDown();
        this.doc.fillColor('black');
        this.doc.font('Helvetica-Bold');
        this.doc.fontSize(12).text('Validador REALDOC');
        this.doc.font('Helvetica');
        this.doc.fillColor('#4B5563');
        this.doc.fontSize(12).text(`${about_content.realdocValidator}`);
        this.doc.moveDown();
        this.doc.fillColor('black');
        this.doc.font('Helvetica-Bold');
        this.doc.fontSize(12).text('Validação manual:');
        this.doc.font('Helvetica');
        this.doc.fillColor('#4B5563');
        this.doc.fontSize(12).text(`${about_content.manualValidation}`);
        this.doc.moveDown();
        this.doc.fillColor('black');
        this.doc.font('Helvetica-Bold');
        this.doc.fontSize(16).text('Aspectos jurídicos essenciais:');
        this.doc.font('Helvetica');
        this.doc.fillColor('#4B5563');
        this.doc.fontSize(12).text(`${about_content.essentialLegalAspects}`);
        this.doc.moveDown();
        const imageWidth = 125;
        const pageWidth = this.doc.page.width;
        const xPosition = (pageWidth - imageWidth) / 2;
        const imageHeight = 125;
        const pageHeight = this.doc.page.height;
        const yPosition = pageHeight - imageHeight - this.doc.page.margins.bottom + 50;
        this.doc.image('./assets/logo.png', xPosition, yPosition, { fit: [125, 125], align: 'center', valign: 'bottom' });
    }
    //!Método essencial para gerar o arquivo PDF.
    generate() {
        this.doc.end();
        console.log('PDF gerado com sucesso!');
    }
}
//EXEMPLO DE EXECUÇÃO DO PDF:
function geraRelatorio() {
    const meu_relatorio = new GenerateReport('./relatorio.pdf', '090503', 'Relatório de organização dos periféricos', 'Lucas L. Schimidt');
    const introduction_text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt arcu at ligula ullamcorper, eget egestas dui ullamcorper. Integer vulputate sapien at bibendum vehicula. Nulla facilisi. Mauris egestas, ipsum ac interdum iaculis, neque lorem vulputate arcu, ac consequat elit justo sit amet purus. Curabitur vehicula auctor ligula, eu viverra odio posuere ac. Curabitur id lorem in libero placerat scelerisque non sit amet neque. Morbi interdum dui eu mauris aliquam, at aliquet justo sodales. Quisque faucibus tempor turpis, sit amet egestas orci vestibulum ac. Vivamus fermentum libero et sem condimentum, sed rhoncus velit vestibulum. Integer feugiat sollicitudin ligula, et tincidunt ligula placerat et. Donec eget est nec sapien euismod convallis id sed augue. Nullam varius purus eget dui gravida, non rutrum purus facilisis. Vivamus ut ligula hendrerit, aliquam dui non, auctor orci. Sed consectetur justo quis bibendum convallis. Aenean eget erat venenatis, euismod purus vitae, tincidunt orci. Ut feugiat, orci nec tincidunt feugiat, nulla dolor convallis velit, sed vehicula est enim a ligula. Aenean auctor ipsum sapien, eu euismod felis auctor nec. Sed fermentum, magna vitae fermentum pretium, enim felis laoreet enim, sit amet mollis purus felis ac purus. Quisque pretium, lectus a laoreet finibus, urna lorem efficitur nulla, euismod dictum purus sapien sed est. Sed tempor massa nisi, at convallis elit sodales at. Aliquam a felis vitae dolor dapibus tempus. Donec fermentum bibendum massa, ac malesuada lacus viverra ut. Etiam cursus orci in nulla rutrum, ac fringilla risus tincidunt. Nunc tincidunt orci sed arcu tincidunt facilisis. In eget lectus felis. Nam in nunc dolor. Ut suscipit, lorem eu euismod volutpat, mi erat tincidunt sem, eget placerat magna augue eu erat. Fusce aliquet, sem non lobortis efficitur, ante dui elementum tortor, ac luctus purus felis sit amet arcu. Donec et dui sed odio maximus gravida et a sapien. Vestibulum ac magna arcu. Aliquam erat volutpat. Nullam dignissim, nisi vel facilisis gravida, dui nulla efficitur nulla, sed sollicitudin nulla ante et dui. Donec tristique libero sed sapien lobortis, et iaculis neque finibus. Aliquam erat volutpat. Cras feugiat viverra risus, ac tincidunt sapien aliquet eu. Mauris vel nisi vitae eros iaculis lacinia. Mauris rutrum urna risus, id tempus eros efficitur ut. Phasellus congue vestibulum ante et consectetur. Fusce efficitur auctor eros id pharetra. Ut vehicula suscipit mauris ac tempor. Aliquam erat volutpat. Nam dapibus cursus urna, eu vestibulum orci tempor sed.';
    meu_relatorio.introductionPage(introduction_text);
    meu_relatorio.certificationPage('./assets/qr_code.png', '193j1e98u12eh1982u3912dh1', 'validation.com');
    //Adicionando os dados da página de detalhes de registro:
    const pacote_um = { archive_name: 'capture_6711396f6336070c.zip', size: 13.74, type: 'Conteúdos capturados', hash: ['09a8sdasnd12uh3jasd', 'asjsi45645uhuh9283190823'] };
    const detalhes_do_registro = { id: '90123j1209ujed182ji123', start_date: '2024-04-03', end_date: '2024-04-07', session_time: 200, utf: '(UTC-03:00) Brasilia', ambiente: 'WEBSITE - Ponto(s) de acesso à internet: 45.170.27.220', packages: [pacote_um] };
    meu_relatorio.registerDetails(detalhes_do_registro);
    //Adicionando imagens:
    const imagem_um = { archive_name: 'minha_imagem.png', size: 20.0, path: './assets/captura.png', date: '2024-12-24', origin: 'google.com', origin_url: 'https://www.google.com', hash: ['hash_exemplo_um11111', 'hash_exemplo_dois2222'] };
    meu_relatorio.addImage(imagem_um);
    const video_um = { archive_name: 'meu_video.mp4', hash: '1928321hsd1hge129873ghdjhga', start_time: '00:00:00', end_time: '00:25:52', duration: 300 };
    const video_dois = { archive_name: 'meu_video_2.mp4', hash: '1928321hsdasd1hge129873ghdjhga', start_time: '00:00:00', end_time: '00:03:11', duration: 300 };
    const historico_um = { url: { link: 'https://google.com', created_at: '2008-05-10', ip_address: '192.168.0.0', owner: 'Google' }, datetime: '2024-12-24 00:00:00' };
    const historico_dois = { url: { link: 'https://google.com', created_at: '2008-05-10', ip_address: '192.168.0.0', owner: 'Google' }, datetime: '2024-12-24 00:00:00' };
    const historico_tres = { url: { link: 'https://google.com', created_at: '2008-05-10', ip_address: '192.168.0.0', owner: 'Google' }, datetime: '2024-12-24 00:00:00' };
    const historico = [historico_um, historico_dois, historico_tres];
    meu_relatorio.videoAndHistoryDetails([video_um, video_dois], historico);
    const strings = {
        aboutRealDoc: "About REALDOC",
        registrationEnvironment: "Registration Environment",
        registeredContentTypes: "Types of Registered Content",
        websiteTechnicalCapture: "Website Technical Capture",
        fileIntegrityWithHashCodes: "File Integrity through HASH Codes",
        pdfAReport: "PDF/A Report",
        digitalSignatureAndTimestampICP: "Digital Signature and Timestamp ICP/Brazil",
        complementaryServices: "Complementary Services",
        registrationScopeAndObject: "Registration Scope and Object",
        technicalSecurityAndCompliance: "Technical Security and Compliance",
        registrationValidation: "Registration Validation",
        realdocValidator: "Verifact Validator",
        manualValidation: "Manual Validation",
        essentialLegalAspects: "Essential Legal Aspects"
    };
    meu_relatorio.aboutPage(strings);
    meu_relatorio.generate();
}
geraRelatorio();
