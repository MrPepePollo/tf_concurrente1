const { AppServerModuleNgFactory, LAZY_MODULE_MAP, ngExpressEngine, provideModuleMap } = require('./dist/server/main');
import express from 'express';
const server = express();
const indexHtml = require('fs').readFileSync('./dist/index.html', 'utf-8');

server.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [provideModuleMap(LAZY_MODULE_MAP)]
}));

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('*', (req, res) => {

  res.setTimeout(600000, () => {
    console.log('La solicitud ha excedido el tiempo límite.');
    res.sendStatus(408);
  });

  res.render('index', {
    req,
    res,
    providers: [
      { provide: 'REQUEST', useValue: req },
      { provide: 'RESPONSE', useValue: res },
      provideModuleMap(LAZY_MODULE_MAP)
    ],
    document: indexHtml,
    url: req.url
  });
});

