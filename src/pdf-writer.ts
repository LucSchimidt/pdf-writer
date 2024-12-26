import PDFDocument, { end, image } from 'pdfkit';
import fs from 'fs';

interface Package {
  archive_name: string;
  size: number;
  type: string;
  hash: String[];
}

interface Imagem {
  archive_name: string;
  path: string;
  date: string;
  origin:string;
  hash: String[];
}

interface Video {
  archive_name: string;
  hash:string;
  start_time: string;
  end_time:string;
  duration:number;
}

interface URL {
  link:string;
  owner: string;
  ip_address: string;
  created_at: string;
}

interface Historico {
  datetime: string;
  url: URL;
}


class GenerateReport {
  private doc: PDFKit.PDFDocument;

    //Classe para geração da capa e definição do arquivo PDF.
    constructor(filePath: string, id:string, title:string, responsable:string) {
        this.doc = new PDFDocument();
        const writeStream = fs.createWriteStream(filePath);
        this.doc.pipe(writeStream);

        const imageWidth = 250;
        const pageWidth = this.doc.page.width;
        const xPosition = (pageWidth - imageWidth) / 2;
        this.doc.image('./assets/logo.png', xPosition, 0, { fit: [250, 250], align: 'center' });

        this.doc.moveDown()
        this.doc.moveDown()
        this.doc.moveDown()
        this.doc.moveDown()
        this.doc.moveDown()
        this.doc.moveDown()
        this.doc.fillColor('#4B5563');
        this.doc.fontSize(32).text('Relatório de captura técnica de conteúdo digital')

        this.doc.moveDown()

        this.doc.fillColor('black');
        this.doc.font('Helvetica-Bold')
        this.doc.fontSize(12).text('Identificador:');
        this.doc.fillColor('#4B5563');
        this.doc.font('Helvetica');
        this.doc.fontSize(16).text(`${id}`);
        this.doc.moveDown()

        this.doc.fillColor('black');
        this.doc.font('Helvetica-Bold')
        this.doc.fontSize(12).text('Título:');
        this.doc.fillColor('#4B5563');
        this.doc.font('Helvetica')
        this.doc.fontSize(16).text(`${title}`);
        this.doc.moveDown()

        this.doc.fillColor('black');
        this.doc.font('Helvetica-Bold')
        this.doc.fontSize(12).text('Responsável:');
        this.doc.fillColor('#4B5563');
        this.doc.font('Helvetica')
        this.doc.fontSize(16).text(`${responsable}`);
        this.doc.moveDown()


        const smallImageWidth = 125;
        const smallXPosition = (pageWidth - smallImageWidth) / 2;
        const imageHeight = 125;
        const pageHeight = this.doc.page.height;
        const yPosition = pageHeight - imageHeight - this.doc.page.margins.bottom + 50;
        this.doc.image('./assets/logo.png', smallXPosition, yPosition, { fit: [125, 125], align: 'center', valign:'bottom'});
    }

    //Gera a página de introdução do relatório:
    introductionPage() {
      const content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt arcu at ligula ullamcorper, eget egestas dui ullamcorper. Integer vulputate sapien at bibendum vehicula. Nulla facilisi. Mauris egestas, ipsum ac interdum iaculis, neque lorem vulputate arcu, ac consequat elit justo sit amet purus. Curabitur vehicula auctor ligula, eu viverra odio posuere ac. Curabitur id lorem in libero placerat scelerisque non sit amet neque. Morbi interdum dui eu mauris aliquam, at aliquet justo sodales. Quisque faucibus tempor turpis, sit amet egestas orci vestibulum ac. Vivamus fermentum libero et sem condimentum, sed rhoncus velit vestibulum. Integer feugiat sollicitudin ligula, et tincidunt ligula placerat et. Donec eget est nec sapien euismod convallis id sed augue. Nullam varius purus eget dui gravida, non rutrum purus facilisis. Vivamus ut ligula hendrerit, aliquam dui non, auctor orci. Sed consectetur justo quis bibendum convallis. Aenean eget erat venenatis, euismod purus vitae, tincidunt orci. Ut feugiat, orci nec tincidunt feugiat, nulla dolor convallis velit, sed vehicula est enim a ligula. Aenean auctor ipsum sapien, eu euismod felis auctor nec. Sed fermentum, magna vitae fermentum pretium, enim felis laoreet enim, sit amet mollis purus felis ac purus. Quisque pretium, lectus a laoreet finibus, urna lorem efficitur nulla, euismod dictum purus sapien sed est. Sed tempor massa nisi, at convallis elit sodales at. Aliquam a felis vitae dolor dapibus tempus. Donec fermentum bibendum massa, ac malesuada lacus viverra ut. Etiam cursus orci in nulla rutrum, ac fringilla risus tincidunt. Nunc tincidunt orci sed arcu tincidunt facilisis. In eget lectus felis. Nam in nunc dolor. Ut suscipit, lorem eu euismod volutpat, mi erat tincidunt sem, eget placerat magna augue eu erat. Fusce aliquet, sem non lobortis efficitur, ante dui elementum tortor, ac luctus purus felis sit amet arcu. Donec et dui sed odio maximus gravida et a sapien. Vestibulum ac magna arcu. Aliquam erat volutpat. Nullam dignissim, nisi vel facilisis gravida, dui nulla efficitur nulla, sed sollicitudin nulla ante et dui. Donec tristique libero sed sapien lobortis, et iaculis neque finibus. Aliquam erat volutpat. Cras feugiat viverra risus, ac tincidunt sapien aliquet eu. Mauris vel nisi vitae eros iaculis lacinia. Mauris rutrum urna risus, id tempus eros efficitur ut. Phasellus congue vestibulum ante et consectetur. Fusce efficitur auctor eros id pharetra. Ut vehicula suscipit mauris ac tempor. Aliquam erat volutpat. Nam dapibus cursus urna, eu vestibulum orci tempor sed."
    
      this.doc.addPage();

      this.doc.font('Helvetica-Bold')
      this.doc.fontSize(16).text('Introdução:');

      this.doc.fillColor('#4B5563');
      this.doc.font('Helvetica')
      this.doc.fontSize(12).text(`${content}`);

      const imageWidth = 125;
      const pageWidth = this.doc.page.width;
      const xPosition = (pageWidth - imageWidth) / 2;
      const imageHeight = 125;
      const pageHeight = this.doc.page.height;
      const yPosition = pageHeight - imageHeight - this.doc.page.margins.bottom + 50;
      this.doc.image('./assets/logo.png', xPosition, yPosition, { fit: [125, 125], align: 'center', valign:'bottom'});

    }

    //Gera a página de certificados, QR Code e código:
    certificationPage(qrcode_path: string, code:string) {
      this.doc.addPage();

      //Bloco da certificação:
      this.doc.font('Helvetica-Bold')
      this.doc.fontSize(16).text('Certificação:');
      
      this.doc.moveDown()

      //Bloco do qrcode e do código:
      this.doc.font('Helvetica-Bold')
      this.doc.fontSize(16).text('Validador Online:');

      this.doc.fillColor('#4B5563');
      this.doc.font('Helvetica')
      this.doc.fontSize(12).text('Validação dos códigos HASH e existência do registro:')

      
      this.doc.image(`${qrcode_path}`, 75, 175, {fit: [125, 125]})
      this.doc.text(`${code}`, 225, 175)


      //Bloco do Importante:
      this.doc.moveDown()

      this.doc.fillColor('black');
      this.doc.font('Helvetica-Bold');
      this.doc.fontSize(16).text('Importante:', 75, 325);

      this.doc.fillColor('#4B5563');
      this.doc.font('Helvetica');
      this.doc.fontSize(12).text(
        'É necessário que cada parte que receba este relatório faça uma verificação deste registro em nosso validador online, verificando a integridade deste documento e outros arquivos anexados. Caso algum arquivo não seja validado corretamente ou o relatório conste como INVÁLIDO, recomendamos que sejam desconsiderados dos autos.',
        75,
        345
      );

      this.doc.moveDown()


      const imageWidth = 125;
      const pageWidth = this.doc.page.width;
      const xPosition = (pageWidth - imageWidth) / 2;
      const imageHeight = 125;
      const pageHeight = this.doc.page.height;
      const yPosition = pageHeight - imageHeight - this.doc.page.margins.bottom + 50;
      this.doc.image('./assets/logo.png', xPosition, yPosition, { fit: [125, 125], align: 'center', valign:'bottom'});
    }

    //Gera a página de detalhes de registro:
    registerDetails(id:string, start_date:string, end_date:string, session_time:number, utf:string, ambiente:string, packages:Package[]) {
      this.doc.addPage();

      //Bloco dos detalhes:
      this.doc.font('Helvetica-Bold')
      this.doc.fontSize(16).text('Detalhes do registro:');
      this.doc.moveDown()

      //Identificador:
      let start_y = 100
      this.doc.fillColor('#4B5563');
      this.doc.font('Helvetica-Bold')
      this.doc.fontSize(12).text(`Identificador:`, 75, start_y);
      this.doc.fillColor('#4B5563');
      this.doc.font('Helvetica')
      this.doc.fontSize(12).text(`${id}`);

      this.doc.moveDown()

      //Horarios:
      start_y = start_y + 50
      this.doc.font('Helvetica-Bold')
      this.doc.fontSize(12).text(`Data inicial:`, 75, start_y);
      this.doc.fillColor('#4B5563');
      this.doc.font('Helvetica')
      this.doc.fontSize(12).text(`${start_date}`);

      this.doc.font('Helvetica-Bold')
      this.doc.fontSize(12).text(`Data final:`, 225, start_y);
      this.doc.fillColor('#4B5563');
      this.doc.font('Helvetica')
      this.doc.fontSize(12).text(`${end_date}`);

      this.doc.font('Helvetica-Bold')
      this.doc.fontSize(12).text(`Tempo de sessão:`, 375, start_y);
      this.doc.fillColor('#4B5563');
      this.doc.font('Helvetica')
      this.doc.fontSize(12).text(`${session_time}`);

      this.doc.moveDown()

      //UTF:
      start_y = start_y + 50
      this.doc.font('Helvetica-Bold')
      this.doc.fontSize(12).text(`Fuso horário definido pelo responsável (Zona GMT):`, 75, start_y);
      this.doc.fillColor('#4B5563');
      this.doc.font('Helvetica')
      this.doc.fontSize(12).text(`${utf}`);

      //Ambiente:
      start_y = start_y + 50
      this.doc.font('Helvetica-Bold')
      this.doc.fontSize(12).text(`Ambiente:`, 75, start_y);
      this.doc.fillColor('#4B5563');
      this.doc.font('Helvetica')
      this.doc.fontSize(12).text(`${ambiente}`);

      //Pacotes gerados:
      start_y = start_y + 50
      this.doc.font('Helvetica-Bold')
      this.doc.fontSize(12).text(`Pacotes gerados:`, 75, start_y);
      this.doc.fillColor('#4B5563');

      this.doc.font('Helvetica')
      for (let i = 0; i < packages.length; i++) {
        this.doc.fontSize(12).text(`${packages[i].archive_name} (${packages[i].size}MB) - ${packages[i].type}`)
        for (let j = 0; j < packages[i].hash.length; j++) {
          this.doc.fontSize(10).text(`${packages[i].hash[j]}`)
        }
      }

      //Imagens da tela:
      start_y = start_y + 75
      this.doc.fillColor('black');
      this.doc.font('Helvetica-Bold')
      this.doc.fontSize(14).text('Imagens de tela:', 75, start_y);
      this.doc.moveDown()



      const imageWidth = 125;
      const pageWidth = this.doc.page.width;
      const xPosition = (pageWidth - imageWidth) / 2;
      const imageHeight = 125;
      const pageHeight = this.doc.page.height;
      const yPosition = pageHeight - imageHeight - this.doc.page.margins.bottom + 50;
      this.doc.image('./assets/logo.png', xPosition, yPosition, { fit: [125, 125], align: 'center', valign:'bottom'});
    }

    //Cada addImage() gera uma página com uma imagem somente e os seus detalhes.
    addImage(image:Imagem) {
      this.doc.addPage({ layout: 'landscape' });
      
      const pageHeight = this.doc.page.height;
      this.doc.fillColor('#4B5563');
      this.doc.font('Helvetica')
      this.doc.fontSize(12).text(`Arquivo: ${image.archive_name} - Registrado em: ${image.date} - Origem: ${image.origin}`)
      for (let i = 0; i < image.hash.length; i++) {
        this.doc.fillColor('#4B5563');
        this.doc.fontSize(10).text(`${image.hash[i]}`)
      }
      this.doc.moveDown()
      this.doc.image(image.path, {width:pageHeight, align: 'center'})

      const imageWidth = 125;
      const pageWidth = this.doc.page.width;
      const xPosition = (pageWidth - imageWidth) / 2;
      const imageHeight = 125;
      const yPosition = pageHeight - imageHeight - this.doc.page.margins.bottom + 50;
      this.doc.image('./assets/logo.png', xPosition, yPosition, { fit: [125, 125], align: 'center', valign:'bottom'});
    }

    //Gera a página com os detalhes dos vídeos e das URL's acessadas:
    videoAndHistoryDetails(videos:Video[], historico:Historico[]) {
      this.doc.addPage({layout:'portrait'})

      //Detalhes dos vídeos:
      let start_y = 100;
      this.doc.fillColor('black');
      this.doc.font('Helvetica-Bold')
      this.doc.fontSize(14).text('Detalhes dos vídeos:', 75, start_y);
      this.doc.font('Helvetica')
      this.doc.fillColor('#4B5563');
      this.doc.fontSize(12).text('Vídeos registrados pelo usuário durante a sessão:');
      this.doc.moveDown()

      for (let i = 0; i < videos.length; i++) {
        this.doc.fillColor('#4B5563');
        this.doc.font('Helvetica-Bold')
        this.doc.fontSize(12).text(`${videos[i].archive_name}`)
        this.doc.font('Helvetica')
        this.doc.fontSize(10).text(`${videos[i].hash} | Início do vídeo: ${videos[i].start_time} - Fim do vídeo: ${videos[i].end_time}`)
        this.doc.fontSize(10).text(`Duração(s): ${videos[i].duration}`)
        this.doc.moveDown()
      }

      //Detalhes do histórico:
      this.doc.moveDown()
      this.doc.fillColor('black');
      this.doc.font('Helvetica-Bold')
      this.doc.fontSize(14).text('Detalhes do Histórico:');
      this.doc.font('Helvetica')
      this.doc.fillColor('#4B5563');
      this.doc.fontSize(12).text('Histórico de pesquisas registrados pelo usuário durante a sessão:');
      this.doc.moveDown()

      for (let i = 0; i < historico.length; i++) {
        this.doc.fillColor('#4B5563');
        this.doc.font('Helvetica-Bold')
        this.doc.fontSize(12).text(`Data e Hora: ${historico[i].datetime}`)
        this.doc.font('Helvetica')
        this.doc.fontSize(12).text(`URL de acesso: ${historico[i].url.link}`, {link:`${historico[i].url.link}`})
        this.doc.moveDown()
      }

      //Detalhes das URL's:
      this.doc.moveDown()
      this.doc.fillColor('black');
      this.doc.font('Helvetica-Bold')
      this.doc.fontSize(14).text("Detalhes das URL's visitadas:");
      this.doc.font('Helvetica')
      this.doc.fillColor('#4B5563');
      this.doc.fontSize(12).text('Detalhes de cada uma das URLs visitadas pelo usuário durante a sessão:');
      this.doc.moveDown()

      for (let i = 0; i < historico.length; i++) {
        this.doc.fillColor('#4B5563');
        this.doc.font('Helvetica-Bold')
        this.doc.fontSize(12).text(`URL: ${historico[i].url.link}`, {link:`${historico[i].url.link}`})
        this.doc.font('Helvetica')
        this.doc.fontSize(10).text(`Criado em: ${historico[i].url.created_at} - Dono: ${historico[i].url.owner}`)
        this.doc.fontSize(10).text(`Endereço de IP: ${historico[i].url.created_at}`)
        this.doc.moveDown()
      }

      const imageWidth = 125;
      const pageWidth = this.doc.page.width;
      const xPosition = (pageWidth - imageWidth) / 2;
      const imageHeight = 125;
      const pageHeight = this.doc.page.height;
      const yPosition = pageHeight - imageHeight - this.doc.page.margins.bottom + 50;
      this.doc.image('./assets/logo.png', xPosition, yPosition, { fit: [125, 125], align: 'center', valign:'bottom'});
    }

    //!Método essencial para gerar o arquivo PDF.
    generate() {
      this.doc.end();
      console.log('PDF gerado com sucesso!');
  }
}
  

//EXEMPLO DE EXECUÇÃO DO PDF:

// const meu_relatorio = new GenerateReport('./relatorio.pdf', '090503', 'Relatório de organização dos periféricos', 'Lucas L. Schimidt');
// meu_relatorio.introductionPage()
// meu_relatorio.certificationPage('./assets/qr_code.png','193j1e98u12eh1982u3912dh1')

// //Adicionando os dados da página de detalhes de registro:
// const pacote_um:Package = {archive_name: 'capture_6711396f6336070c.zip', size: 13.74, type: 'Conteúdos capturados', hash: ['09a8sdasnd12uh3jasd', 'asjsi45645uhuh9283190823']} 
// meu_relatorio.registerDetails('90123j1209ujed182ji123', '2024-04-03', '2024-04-07', 200, '(UTC-03:00) Brasilia','WEBSITE - Ponto(s) de acesso à internet: 45.170.27.220',[pacote_um])


// //Adicionando imagens:
// const imagem_um:Imagem = {archive_name: 'minha_imagem.png', path: './assets/captura.png', date: '2024-12-24', origin: 'desktop', hash:['hash_exemplo_um11111', 'hash_exemplo_dois2222']}
// meu_relatorio.addImage(imagem_um)

// const video_um:Video = {archive_name: 'meu_video.mp4', hash: '1928321hsd1hge129873ghdjhga', start_time:'00:00:00', end_time:'00:25:52', duration: 300}
// const video_dois:Video = {archive_name: 'meu_video_2.mp4', hash: '1928321hsdasd1hge129873ghdjhga', start_time:'00:00:00', end_time:'00:03:11', duration: 300}

// const historico_um:Historico = {url: {link: 'https://google.com', created_at: '2008-05-10', ip_address:'192.168.0.0', owner:'Google'}, datetime: '2024-12-24 00:00:00'}
// const historico_dois:Historico = {url: {link: 'https://google.com', created_at: '2008-05-10', ip_address:'192.168.0.0', owner:'Google'}, datetime: '2024-12-24 00:00:00'}
// const historico_tres:Historico = {url: {link: 'https://google.com', created_at: '2008-05-10', ip_address:'192.168.0.0', owner:'Google'}, datetime: '2024-12-24 00:00:00'}
// const historico:Historico[] = [historico_um, historico_dois, historico_tres]

// meu_relatorio.videoAndHistoryDetails([video_um, video_dois], historico)

// meu_relatorio.generate()
