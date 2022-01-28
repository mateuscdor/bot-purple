import { log } from "./log";
const Fs = require("@supercharge/filesystem");
/*
            Use the @supercharge/filesystem Package
            I’m the maintainer of the @supercharge/filesystem package providing convenient file system utilities. Methods in the @supercharge/filesystem package are async by default and don’t block the event loop.

            You may use the exists method to check if a file path exists on your disk:

            const Path = require('path')
            const Fs = require('@supercharge/filesystem')

            const path = Path.join(__dirname, "existing-file.txt")

            await Fs.exists(path)
            // true

            Enjoy!

          source: https://futurestud.io/tutorials/node-js-check-if-a-file-exists
      */
/* //#region
venom
  .create()
  .then((client) => start(client))
  .catch((error) => console.log(error));
*/ //#endregion
// ------------- CONFIGURAÇOES EM JSON: ----------------
// para saber mais sobre escrita de arquivos
// https://www.horadecodar.com.br/2020/07/14/como-criar-arquivos-com-node-js-escrever-arquivos/
/*
function salvarConfgChat(nomeArquivo, dados) {
  const nome = `./Zuck-Bot-Data/${nomeArquivo}.json`
  fs.writeFile(nome, dados, (err) => {
      if (err) throw err
      console.log('O arquivo foi salvo!')
  })
}
*/
//==============================================================================
export function salvarConfgChat(nomeArquivo, dados) {
    const nome = `./${nomeArquivo}.json`;
    Fs.writeFile(nome, JSON.stringify(dados), (err) => {
        if (err)
            throw err;
        log(`O arquivo de config foi salvo! ID: ${nomeArquivo}`);
    });
}
