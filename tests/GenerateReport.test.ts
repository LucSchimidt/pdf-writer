// Importando diretamente por caminho relativo
import GenerateReport, { Historico, Imagem, Package, Video } from '../src/GenerateReport';


describe('GenerateReport', () => {
    it('should create PDF correctly', () => {

        const meu_relatorio = new GenerateReport('./relatorio-test2.pdf', '090503', 'Relatório de organização dos periféricos', 'Lucas L. aaaaaaaSchimidt');
        meu_relatorio.introductionPage()
        meu_relatorio.certificationPage('./assets/qr_code.png','193j1e98u12eh1982u3912dh1')

        //Adicionando os dados da página de detalhes de registro:
        const pacote_um:Package = {archive_name: 'capture_6711396f6336070c.zip', size: 13.74, type: 'Conteúdos capturados', hash: ['09a8sdasnd12uh3jasd', 'asjsi45645uhuh9283190823']}
        meu_relatorio.registerDetails('90123j1209ujed182ji123', '2024-04-03', '2024-04-07', 200, '(UTC-03:00) Brasilia','WEBSITE - Ponto(s) de acesso à internet: 45.170.27.220',[pacote_um])


        //Adicionando imagens:
        const imagem_um:Imagem = {archive_name: 'minha_imagem.png', path: './assets/captura.png', date: '2024-12-24', origin: 'desktop', hash:['hash_exemplo_um11111', 'hash_exemplo_dois2222']}
        meu_relatorio.addImage(imagem_um)

        const video_um:Video = {archive_name: 'meu_video.mp4', hash: '1928321hsd1hge129873ghdjhga', start_time:'00:00:00', end_time:'00:25:52', duration: 300}
        const video_dois:Video = {archive_name: 'meu_video_2.mp4', hash: '1928321hsdasd1hge129873ghdjhga', start_time:'00:00:00', end_time:'00:03:11', duration: 300}

        const historico_um:Historico = {url: {link: 'https://google.com', created_at: '2008-05-10', ip_address:'192.168.0.0', owner:'Google'}, datetime: '2024-12-24 00:00:00'}
        const historico_dois:Historico = {url: {link: 'https://google.com', created_at: '2008-05-10', ip_address:'192.168.0.0', owner:'Google'}, datetime: '2024-12-24 00:00:00'}
        const historico_tres:Historico = {url: {link: 'https://google.com', created_at: '2008-05-10', ip_address:'192.168.0.0', owner:'Google'}, datetime: '2024-12-24 00:00:00'}

        const historico:Historico[] = [historico_um, historico_dois, historico_tres]

        meu_relatorio.videoAndHistoryDetails([video_um, video_dois], historico)

        expect(meu_relatorio).toBeDefined();
        expect(meu_relatorio.generate()).toStrictEqual(true);
        
    });
});