
// returns on attributes params as a object
function SeperateNonAttribParams(model, queries){

    let params = {};
    for(let query of Object.keys(queries)){  
        if(!Object.keys(model.schema.paths).includes(query)){
            params[query]=queries[query];
            delete queries[query];
        }
    }
    return params;
    
}

// returns Attributes in a objecy
function SeperateAttribParams(model, queries){

    let params = {};
    for(let query of Object.keys(queries)){  
        if(Object.keys(model.schema.paths).includes(query)){
            params[query]=queries[query];
            delete queries[query];
        }
    }
    return params;
    
}

module.exports = {SeperateNonAttribParams, SeperateAttribParams}