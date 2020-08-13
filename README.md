# Gerenciador de Exames

Esta aplicação é direcionada ao armazenamento e organização de exames e consultas realizadas pelo usuário.
Tendo como prioridade fornecer uma ferramenta que ajude o usuário a sistematizar seus dados relacionado a saúde. Com objetivo de armazenar e organizar qualquer tipo de exame exemplo: Hemograma, raioX, tomografia entre outros, em um único lugar. Assim como possibilitar que o usuário armazene as consultas médicas quando for necessário. Sendo assim facilitando o acesso a essas informações em uma nova consulta.
Esta aplicação contêm duas partes específicas:
 # Back-end:
    Realizando a comunicação com banco de dados, sendo responsável pela regra de negócio do sistema. Estabelecendo uma ponte entre os dados que vem do navegador rumo ao banco de dados e vice-versa. Obtendo comunicação multiplataforma, em outras palavras está aplicação recebe dados tanto da aplicação web quando mobile(software desenvolvido para dispositivo móvel).
 # Front-end:
    Realizando a comunicação do usuário com o servidor, assim como "dar vida" à interface do usuário, apresentando conteúdo e interagindo diretamente com o usuário; 

Para a instalar o sistema é muito simples, siga as instruções a seguir:

Passo 1.
   Se estiver usando linux atualize o sistema com o comando abaixo. Se estiver usando Windows ir para o passo 2.: // explicar

      sudo apt -y update && sudo apt -y upgrade

Passo 2.
   *Linux - Após a atualização do sistema, instale a plataforma de aplicação Node.js(Interpretador de JavaScript). Segue três opções para realizar o procedimento.

      Baixando executável: 
         Segue o link: https://nodejs.org/en/download/
      Linha de comando:
         Segue o link: https://github.com/nodesource/distributions/blob/master/README.md

   * Windows - Para usuários deste sistema operacional recomenda-se instalar o Chocolatey, que é um gerenciador de pacotes gratuito de código aberto muito semelhante ao apt do linux.
   
     * Link Chocolatey: https://www.liquidweb.com/kb/how-to-install-chocolatey-on-windows/.
     
     * Link Node.JS: https://nodejs.org/en/

   * MacOS
      Link: https://nodejs.org/pt-br/download/package-manager/#macos

Comando utilizado:

curl -sL https://deb.nodesource.com/setup_13.x | sudo bash -

instalar node
Comando utilizado:

sudo apt-get install -y nodejs

instalar MYSQL para configurar banco de dados
Utilizado Workbench
Seguir comandos do site: https://www.edivaldobrito.com.br/como-instalar-o-instalar-mysql-workbench-no-ubuntu-e-derivados/7

outra opção:

Comando site https://linux4one.com/how-to-install-mysql-on-linux-mint-19

XAMPP ou outro servidor local a escolha do dev

Utilizado nesse trabalho XAMPP 
Seguir comandos do site: https://www.edivaldobrito.com.br/como-instalar-o-xampp-no-linux/

Comando linux para abrir xampp: sudo /opt/lampp/manager-linux-x64.run

colocar banco no mysql-Workbench

ligar o servidor e testar o banco na própria ferramenta, se estiver funcionando seguir os passos seguintes:

instalar axios na pasta que contém a parte frontend "ApiWeb" no meu caso diretorio "/Projeto TCC/NodeJS-WebService/AppWeb"
Seguir comandos do site: https://www.npmjs.com/package/axios

instalar nodemon, para  desenvolvimento (sudo su) npm install -g nodemon
por terminais separados vá nas pastas AppWeb e API, em cada uma delas execute nodemon start para startar os dois serviços

ou

Caso não tenha instalado o nodemon utilize o comando npm run start






