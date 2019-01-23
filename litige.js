   
   var constants = require('./constants');
   
   this.complexite=function(valeurLitige,taxes){
        var returnCompl = '';
    
        if(valeurLitige < constants.LITIGE_5000 && taxes != constants.TPS_TVQ){
            returnCompl = "1";
        }
        if(valeurLitige < constants.LITIGE_100000 && taxes == constants.TPS_TVQ){
            returnCompl = "1";
        }
        if(valeurLitige > constants.LITIGE_100000 && valeurLitige <= constants.LITIGE_300000){
            returnCompl = "2";
        }
        if(valeurLitige > constants.LITIGE_300000 && valeurLitige <= constants.LITIGE_1000000){
            returnCompl = "3";
        }
        if(valeurLitige > constants.LITIGE_1000000){
            returnCompl = "4";
        }
    
        return returnCompl;
    }