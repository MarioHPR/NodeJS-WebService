# Gerenciador de Exames

## Esta aplicação é direcionada ao armazenamento e organização de exames e consultas realizadas pelo usuário.
## Tendo como prioridade fornecer uma ferramenta que ajude o usuário a sistematizar seus dados relacionado a saúde. Com objetivo de armazenar e organizar qualquer tipo de exame exemplo: Hemograma, raioX, tomografia entre outros, em um único lugar. Assim como possibilitar que o usuário armazene as consultas médicas quando for necessário. Sendo assim facilitando o acesso a essas informações em uma nova consulta.
## Esta aplicação contêm duas partes específicas:
 # Back-end:
   Realizando a comunicação com banco de dados, sendo responsável pela regra de negócio do sistema. Estabelecendo uma ponte entre os dados que vem do navegador rumo ao banco de dados e vice-versa. Obtendo comunicação multiplataforma, em outras palavras está aplicação recebe dados tanto da aplicação web quando mobile(software desenvolvido para dispositivo móvel).
 # Front-end:
   Realizando a comunicação do usuário com o servidor, assim como "dar vida" à interface do usuário, apresentando conteúdo e interagindo diretamente com o usuário; 

# Instalação
Para a instalar o sistema, siga as instruções a seguir:

Passo 1.
   * Se estiver usando Windows ir para o passo 2.:
   * Se estiver usando linux atualize o sistema com o comando abaixo.

      sudo apt -y update && sudo apt -y upgrade

Passo 2.
   * Linux - Após a atualização do sistema, instale a plataforma de aplicação Node.js(Interpretador de JavaScript). Segue duas opções para realizar o procedimento.

      * Baixando executável: 
         * Segue o link: https://nodejs.org/en/download/
      * Linha de comando:
         * Segue o link: https://github.com/nodesource/distributions/blob/master/README.md
         * Comandos utilizado:
            1. curl -sL https://deb.nodesource.com/setup_13.x | sudo bash -
            2. sudo apt-get install -y nodejs

   * Windows - Para usuários deste sistema operacional recomenda-se instalar o Chocolatey, que é um gerenciador de pacotes gratuito de código aberto muito semelhante ao apt do linux.
   
     * Link Chocolatey: https://www.liquidweb.com/kb/how-to-install-chocolatey-on-windows/.
     * Link Node.JS: https://nodejs.org/en/

   * MacOS
      * Link: https://nodejs.org/pt-br/download/package-manager/#macos

Passo 3.
   * instalar MYSQL Workbench para construir o banco de dados.
      * Seguir comandos do site: https://www.edivaldobrito.com.br/como-instalar-o-instalar-mysql-workbench-no-ubuntu-e-derivados/7

   * outra opção:
      * Comando site https://linux4one.com/how-to-install-mysql-on-linux-mint-19

Passo 4.
   * Para esse projeto foi utilizado o XAMPP para simular um servidor localmente. Fica a critério de cada dev.

   * caso for utilizar o XAMPP,seguir comandos do site: 
      https://www.edivaldobrito.com.br/como-instalar-o-xampp-no-linux/

   * Comando linux para abrir xampp: 
      sudo /opt/lampp/manager-linux-x64.run

   * Clicar no botão "Start" no serviço MYSQL Database, como mostra a figura abaixo:
      <img src="https://github.com/MarioHPR/fotos/blob/master/xampp.png?raw=true" width="600" alt="Clicar no botão 'Start' no serviço MYSQL Database">

Passo 5.
   (OBS) Para seguir o passo 5, deve concluir todo o passo 4.
   1. Abrir o Workbench, após isso clicar duas vezes na parte selecionada. Como mostra a imagem abaixo:
   <img src="https://github.com/MarioHPR/fotos/blob/master/teste.png?raw=true" width="600" alt="tela principal workbench">

   1. Abrirá outra janela e deve clicar no botão escrito "Continue Anyway";
   2. Copiar todo o script que está no arquivo "banc0.sql";
      * Link: https://github.com/MarioHPR/NodeJS-WebService/blob/master/API/banco/bancoTCC2.sql
      * Colar dentro do workbench, ficando igual a imagem seguinte;
         <img src="https://github.com/MarioHPR/fotos/blob/master/workBench.png?raw=true" width="600" alt="tela para colar script do banco">
      * Como mostra na imagem acima clicar no botão assinalado em vermelho.
      Com esses passos o banco de dados estará pronto para ser utilizado localmente.
   3. Testar o banco na própria ferramenta, se estiver funcionando seguir os proximos passos:

Passo 6.
   Nesta etapa vamos instalar axios, que é uma biblioteca que trabalha tanto com XMLHttpRequest quanto http do node. Axios é um cliente http que precisa ser instalada na pasta que contém frontend "ApiWeb". Sendo assim realizando a comunicação com nosso back-end.
   Deve-se instalar está biblioteca no diretorio "/NodeJS-WebService/AppWeb" segue exemplo logo a baixo;
      <img src="https://github.com/MarioHPR/fotos/blob/master/terminal.png?raw=true" width="600" alt="Terminal de exemplo">
   Seguir comandos do site: https://www.npmjs.com/package/axios

instalar nodemon, para  desenvolvimento (sudo su) npm install -g nodemon
por terminais separados vá nas pastas AppWeb e API, em cada uma delas execute nodemon start para startar os dois serviços

ou

Caso não tenha instalado o nodemon utilize o comando npm run start






