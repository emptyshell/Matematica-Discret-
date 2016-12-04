    $(document).ready(function () {
    
    var mainData = [];
    var mValidate = 0;
    var adiacentArray;
    var done = false;


    function read() { 
        var virfuri = document.getElementById("virfuri").value; 
        var muchii = document.getElementById("muchii").value; 
        var orientation = document.getElementById("orientat").value; 
        mainData = [virfuri,muchii,orientation];
        read ();
    }

    

    });
    console.log(mainData);
    // Matrice de adiacenta
    

    function makeAdiacentArray () {
        var virfuri = mainData[0];
        var aMatrix = new Array(virfuri);
        for (var i=0; i<virfuri; i++) {
                aMatrix[i]= new Array(virfuri);
        }
        for (var i=0; i<virfuri; i++) {
            for(var j=0; j<virfuri; j++) {
                aMatrix[i][j]=0;
            }
        }
        console.log(aMatrix);
        return aMatrix;
        
    }
    
    function showAdiacentArray() {
         
        var table = document.getElementById("aMatrixTable");
        var virfuri = mainData[0];
        var array = adiacentArray;
        console.log(array);
        $("#aMatrixTable tr td").remove();
        for(var i = 0; i < virfuri; i++) {
            var row = table.insertRow(table.rows.length);
            for (var j=virfuri-1; j>=0; j--) {
                var cell = row.insertCell(0);
                cell.innerHTML = array[i][j];
            }
        }
        
    }

    

    function getEdge() {
        var v1 = document.getElementById("insertMV1").value;
        var v2 = document.getElementById("insertMV2").value;
        var array = adiacentArray,
            orientation = mainData[2],
            muchii = mainData[1];
        if (mValidate < muchii) {
            if (orientation == 1) {
                array[v1-1][v2-1] = 1;
                array[v2-1][v1-1] = 1;
                mValidate=mValidate+1;
            }
            else {

            }
        }
        else {
            document.getElementById("mStatus").innerHTML = "Ati introdus toate muchiile!"
        }

    }
    

    // Matricea de incidenta
    /*
    function makeIncidentArray () {
        var virfuri = mainData[0],
            muchii = mainData[1],
            orientation = mainData[2];
        var iMatrix = new Array(virfuri);
        for (var i = 0; i < virfuri; i++) {
            iMatrix[i] = new Array(muchii);
        }
        for (var i=0; i<virfuri; i++) {
            for(var j=0; j<virfuri; j++) {
                iMatrix[i][j]=0;
            }
        }
        return iMatrix;
    }
	
	var incidentArray = new Array();


    function showIncidentArray() {
        $("#iMatrixTable tr td").remove(); 
        var table = document.getElementById("iMatrixTable");
        var array = adiacentArray;
        var virfuri = mainData[0],
            muchii = mainData[1],
            orientation = mainData[2];
        for(var i=0; i<virfuri; i++) {
            var row = table.insertRow(table.rows.length);
            for (var j=0; j<muchii; j++) {
                var cell = row.insertCell(0);
                cell.innerHTML = array[i][j];
            }
        }
        
    }
	*/
    // jquery