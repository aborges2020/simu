var express = require('express');
var parseInt = require('parse-int');
var constants = require('./constants');
var litige = require('./litige');
var file = './codes.json';
const jsonfile = require('jsonfile')

var app = express();
app.use(express.json());


app.post('/', function (request, response) {
    var dataFileJson = jsonfile.readFileSync(file);

    var bodyScenario = request.body;
    var type = bodyScenario.simu.elem.type;
    var sujet = bodyScenario.simu.elem.sujet;
    var montant = bodyScenario.simu.elem.montant;
    var interv_ext = bodyScenario.simu.elem.interv_ext;
    var groupe = bodyScenario.simu.elem.groupe;
    var grand_soc = bodyScenario.simu.elem.grand_soc;
    var region = bodyScenario.simu.elem.region;
    var code_prov = bodyScenario.simu.elem.code_prov;
    var elem = constants.MSG_SUJET_INEXISTENT;

    dataFileJson.codes.forEach(function (element) {

        if (element.sujet == sujet) {

            elem = element.complexite;

            if (parseInt(litige.complexite(montant, type)) > parseInt(elem)) {
                elem = litige.complexite(montant, type);
            }

            if (interv_ext == constants.IMPLICATION_PDG || 
                groupe == constants.GROUPE_TPS_TVQ) {
                elem = "4";
            }

            if ((interv_ext == constants.REGION_BP || 
                interv_ext == constants.REGION_PC) && elem == "1") {
                elem = "2";
            }

            if (groupe == constants.GROUPE_PFA) {
                elem = "4";
            }

            if ((elem == "1" || elem == "2") &&
                (interv_ext == constants.IMPLICATION_PDG ||
                    interv_ext == constants.DIRECTEUR_GENERAL_LEGISLATION ||
                    interv_ext == constants.PR_PDG_RQ)) {
                elem = "3";
            }

            // 1x
            if (grand_soc == constants.GRANDE_SOC_OUI &&
                region != constants.REGION_HQ_HORS_QUEBEC &&
                code_prov != constants.CODE_PROV_MI_DGP_INTERLOPE &&
                code_prov != constants.CODE_PROV_VE_DGLE_ENQUETE &&
                elem != "4") {
                elem = parseInt(elem) + 1;
            }
            if (grand_soc != constants.GRANDE_SOC_OUI &&
                region == constants.REGION_HQ_HORS_QUEBEC &&
                code_prov != constants.CODE_PROV_MI_DGP_INTERLOPE &&
                code_prov != constants.CODE_PROV_VE_DGLE_ENQUETE &&
                elem != "4") {
                elem = parseInt(elem) + 1;
            }
            if (grand_soc != constants.GRANDE_SOC_OUI &&
                region != constants.REGION_HQ_HORS_QUEBEC &&
                code_prov == constants.CODE_PROV_MI_DGP_INTERLOPE &&
                code_prov != constants.CODE_PROV_VE_DGLE_ENQUETE &&
                elem != "4") {
                elem = parseInt(elem) + 1;
            }
            if (grand_soc != constants.GRANDE_SOC_OUI &&
                region != constants.REGION_HQ_HORS_QUEBEC &&
                code_prov != constants.CODE_PROV_MI_DGP_INTERLOPE &&
                code_prov == constants.CODE_PROV_VE_DGLE_ENQUETE &&
                elem != "4") {
                elem = parseInt(elem) + 1;
            }
            //----- 2x
            if (grand_soc == constants.GRANDE_SOC_OUI &&
                region == constants.REGION_HQ_HORS_QUEBEC &&
                code_prov != constants.CODE_PROV_MI_DGP_INTERLOPE &&
                code_prov != constants.CODE_PROV_VE_DGLE_ENQUETE &&
                elem != "4") {
                elem = parseInt(elem) + 1;
            }
            if (grand_soc == constants.GRANDE_SOC_OUI &&
                region != constants.REGION_HQ_HORS_QUEBEC &&
                code_prov == constants.CODE_PROV_MI_DGP_INTERLOPE &&
                code_prov != constants.CODE_PROV_VE_DGLE_ENQUETE &&
                elem != "4") {
                elem = parseInt(elem) + 1;
            }
            if (grand_soc == constants.GRANDE_SOC_OUI &&
                region != constants.REGION_HQ_HORS_QUEBEC &&
                code_prov != constants.CODE_PROV_MI_DGP_INTERLOPE &&
                code_prov == constants.CODE_PROV_VE_DGLE_ENQUETE &&
                elem != "4") {
                elem = parseInt(elem) + 1;
            }
            if (grand_soc != constants.GRANDE_SOC_OUI &&
                region == constants.REGION_HQ_HORS_QUEBEC &&
                code_prov == constants.CODE_PROV_MI_DGP_INTERLOPE &&
                code_prov != constants.CODE_PROV_VE_DGLE_ENQUETE &&
                elem != "4") {
                elem = parseInt(elem) + 1;
            }
            if (grand_soc != constants.GRANDE_SOC_OUI &&
                region == constants.REGION_HQ_HORS_QUEBEC &&
                code_prov != constants.CODE_PROV_MI_DGP_INTERLOPE &&
                code_prov == constants.CODE_PROV_VE_DGLE_ENQUETE &&
                elem != "4") {
                elem = parseInt(elem) + 1;
            }
            if (grand_soc != constants.GRANDE_SOC_OUI &&
                region != constants.REGION_HQ_HORS_QUEBEC &&
                code_prov == constants.CODE_PROV_MI_DGP_INTERLOPE &&
                code_prov == constants.CODE_PROV_VE_DGLE_ENQUETE &&
                elem != "4") {
                elem = parseInt(elem) + 1;
            }
            //---3x+
            if (grand_soc == constants.GRANDE_SOC_OUI &&
                region == constants.REGION_HQ_HORS_QUEBEC &&
                code_prov == constants.CODE_PROV_MI_DGP_INTERLOPE &&
                code_prov != constants.CODE_PROV_VE_DGLE_ENQUETE &&
                elem != "4") {
                if (elem == "1" || elem == "2") {
                    elem = parseInt(elem) + 2;
                } else {
                    elem = "4";
                }
            }
            if (grand_soc == constants.GRANDE_SOC_OUI &&
                region == constants.REGION_HQ_HORS_QUEBEC &&
                code_prov != constants.CODE_PROV_MI_DGP_INTERLOPE &&
                code_prov == constants.CODE_PROV_VE_DGLE_ENQUETE &&
                elem != "4") {
                if (elem == "1" || elem == "2") {
                    elem = parseInt(elem) + 2;
                } else {
                    elem = "4";
                }
            }
            if (grand_soc == constants.GRANDE_SOC_OUI &&
                region != constants.REGION_HQ_HORS_QUEBEC &&
                code_prov == constants.CODE_PROV_MI_DGP_INTERLOPE &&
                code_prov == constants.CODE_PROV_VE_DGLE_ENQUETE &&
                elem != "4") {
                if (elem == "1" || elem == "2") {
                    elem = parseInt(elem) + 2;
                } else {
                    elem = "4";
                }
            }
            if (grand_soc != constants.GRANDE_SOC_OUI &&
                region == constants.REGION_HQ_HORS_QUEBEC &&
                code_prov == constants.CODE_PROV_MI_DGP_INTERLOPE &&
                code_prov == constants.CODE_PROV_VE_DGLE_ENQUETE &&
                elem != "4") {
                if (elem == "1" || elem == "2") {
                    elem = parseInt(elem) + 2;
                } else {
                    elem = "4";
                }
            }
            if (grand_soc == constants.GRANDE_SOC_OUI &&
                region == constants.REGION_HQ_HORS_QUEBEC &&
                code_prov == constants.CODE_PROV_MI_DGP_INTERLOPE &&
                code_prov == constants.CODE_PROV_VE_DGLE_ENQUETE &&
                elem != "4") {
                if (elem == "1" || elem == "2") {
                    elem = parseInt(elem) + 2;
                } else {
                    elem = "4";
                }
            }
        }
    });

    response.send(constants.MSG_COMPLEXITE + elem + constants.MSG_SIGN);
});





app.listen(3000);