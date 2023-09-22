import healthcheckRoute from './health-check/health-check.route';
import htmltopdfRoute from './html-pdf/html-pdf.route';

const routes = [new healthcheckRoute(), new htmltopdfRoute()];

export default routes;
