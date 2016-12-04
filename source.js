    
    
    var mainData = []; // virfuri,muchii si orientarea grafului{orientat,neorientat}
    var mValidate = 0; 
    var adiacentArray; // matricea de adiacenta
    var incidentArray; // matricea de incidenta 
    var lista; // lista

    function read() { 
        var virfuri = document.getElementById("virfuri").value; 
        Number(virfuri);
        var muchii=-1; 
        Number(muchii);
        var orientation = $("input:radio[name=tipGr]:checked").val(); 
        var virfuriArray = Array(mainData[0]);
        for (var i=0; i<=virfuri;i++) {
        virfuriArray[i] = i;
    }
        mainData = [virfuri,muchii,orientation,virfuriArray];

        document.getElementById("gInfoStatus").innerHTML = "Informatia introdusă cu succes!";
        
    }


    
    
    // Matrice de adiacenta
    

    function makeAdiacentArray (virfuri) {
        var aMatrix = new Array(virfuri);
        for (var i=0; i<=virfuri; i++) {
                aMatrix[i]= new Array(virfuri);
        }
        for (var i=0; i<=virfuri; i++) {
            for(var j=0; j<=virfuri; j++) {
                aMatrix[i][j]=0;
            }
        }
        return aMatrix;
        
    }
    
    function showAdiacentArray() {
        $("#aMatrixTable tr td").remove();
        var table = document.getElementById("aMatrixTable");
        var virfuri = mainData[0];
        var array = adiacentArray;
        var vA = mainData[3];

        if (array == undefined) {
            $("#aMatrixDiv").attr('class','text-danger');
                    document.getElementById("aMatrixTable").innerHTML = "Matricea de incidența nu a fost creata! <br> Introduceți numarul de virfuri!!!";
        }
        else {
            $("#aMatrixDiv").attr('class','');
                document.getElementById("aMatrixTable").innerHTML = "";
        for(var i = -1; i <= virfuri; i++) {
            var row = table.insertRow(table.rows.length);
            for (var j=virfuri; j>=-1; j--) {
                if ((i == -1) && (j == -1)) {
                    var cell = row.insertCell(0);
                    cell.innerHTML = " ";
                }
                else if ((j == -1)) {
                    var cell = row.insertCell(0);
                    if (cell.innerHTML.value == undefined)
                    cell.innerHTML = "<b>v"+vA[i]+"</b>";
                }
                else if (i == -1) {
                    var cell = row.insertCell(0);
                    if (cell.innerHTML.value == undefined)
                    cell.innerHTML ="<b>v"+vA[j]+"</b>";
                }
                else {
                    var cell = row.insertCell(0);
                    cell.innerHTML = array[i][j];
                }
            }
        }
    }
        
    }

    // Matricea de incidenta
    
    function makeIncidentArray (virfuri,muchii) {
        if (muchii == -1) return;
        var iMatrix = new Array(muchii);
        for (var i = 0; i <= muchii; i++) {
            iMatrix[i] = new Array(virfuri);
        }
        for (var i=0; i<=muchii; i++) {
            for(var j=0; j<=virfuri; j++) {
                iMatrix[i][j]=0;
            }
        }
        return iMatrix;
    }

    var adaugat = 0;
    function showIncidentArray() {
        
        var table = document.getElementById("iMatrixTable");
        
        var virfuri = mainData[0],
            muchii = mainData[1],
            arr = incidentArray;
        var a = adaugat;
        if (arr == undefined) {
            $("#iMatrixDiv").attr('class','text-danger');
                    document.getElementById("iMatrixTable").innerHTML = "Matricea de incidența nu a fost creata! <br> Introduceți numarul de virfuri!!!";
        }
        else {
            $("#iMatrixDiv").attr('class','');
                $("#iMatrixTable tr td").remove(); 
                document.getElementById("iMatrixTable").innerHTML = "";

        for(var i = -1; i <= muchii; i++) {
            var row = table.insertRow(table.rows.length);
            
            
            for (var j=virfuri; j>=-1; j--) {
                if ((i == -1) && (j == -1)) {
                    var cell = row.insertCell(0);
                    cell.innerHTML = " ";
                }
                else if ((j == -1)) {
                    var cell = row.insertCell(0);
                    cell.innerHTML = "<b>"+"u"+i+"</b>";
                    }
                else if (i == -1) {
                    //if (cell.innerHTML.value != "") {
                    var cell = row.insertCell(0);
                    cell.innerHTML ="<b>v"+mainData[3][j]+"</b>";
                    //}
                }
                else {
                    var cell = row.insertCell(0);
                    cell.innerHTML = arr[i][j];
                }
            }
        }
       } 
       a = 1;
       adaugat = a;
    }

    // lista

    function createList() {
        var ls;
        var array = adiacentArray;
        var virfuri = mainData[0];
        ls = new Array(virfuri);
        for(var i = 0; i <= virfuri; i++) {
            ls[i]=[];
        }
        for (var i = 0; i<=virfuri;i++) {
            for (var j = 0; j<=virfuri;j++) {
                if (array[i][j] == 1) {
                    ls[i].push(j);
                }
            }
        }
        return ls;
    }



    function showList() {
        document.getElementById("shList").innerHTML="";
        var ls = lista;
        var virfuri = mainData[0];
        if (ls == undefined) {
            $("#listDiv").attr('class','text-danger');
                    document.getElementById("shList").innerHTML = "Matricea de incidența nu a fost creata! <br> Introduceți numarul de virfuri!!!";
        }
        else {
            $("#listDiv").attr('class','');
                document.getElementById("shList").innerHTML = "";
        for (var i = 0; i<=virfuri; i++) {
            $("#shList").append("<b>"+mainData[3][i]+":  "+"</b>");
            for (var j = 0; j<ls[i].length; j++) {
               $("#shList").append(ls[i][j]+" "); 
            }
            $("#shList").append("<br />");
        }
        }

    }
    var edgeData = [];
    //muchii

    function getEdge() {
        var v1 = document.getElementById("insertMV1").value;
        var v2 = document.getElementById("insertMV2").value;
        var arrayA = adiacentArray,
            arrayI = incidentArray,
            orientation = mainData[2],
            muchii = mainData[1];
            virfuri = mainData[0];
            if (muchii == -1) {
                arrayI = [];
            }
            if ((virfuri == undefined) && (orientation == undefined)) {
                $("#mStatus").attr('class','text-danger');
                    document.getElementById("mStatus").innerHTML = "Mai întii creați graful!";
                    return;
            }

            if ((v1 == '') && (v2 == '')) {
                $("#mStatus").attr('class','text-danger');
                    document.getElementById("mStatus").innerHTML = "v1 și v2 nu a fost introduse!";;
                    return;
            }
            if ((v1 == '') && !(v2 == '')) {
                $("#mStatus").attr('class','text-danger');
                    document.getElementById("mStatus").innerHTML = "v1 nu a fost introduse!";;
                    return;
            }
            if (!(v1 == '') && (v2 == '')) {
                $("#mStatus").attr('class','text-danger');
                    document.getElementById("mStatus").innerHTML = "v2 nu a fost introduse!";;
                    return;
            }

            if ((v1 > virfuri)&&(v2 > virfuri)) {
                $("#mStatus").attr('class','text-danger');
                    document.getElementById("mStatus").innerHTML = "Vîrful "+v1+" și "+v2+" nu există!";
            }
            else
            if (v1 > virfuri) {
                $("#mStatus").attr('class','text-danger');
                    document.getElementById("mStatus").innerHTML = "Vîrful "+v1+" nu există!";
            }
            else
            if (v2 > virfuri) {
                $("#mStatus").attr('class','text-danger');
                    document.getElementById("mStatus").innerHTML = "Vîrful "+v2+" nu există!";
            }
            else {
            if (orientation == 0) {
                if ((arrayA[v1][v2] == 1) && (arrayA[v2][v1] == 1)) {
                    $("#mStatus").attr('class','text-danger');
                    document.getElementById("mStatus").innerHTML = "Muchia au fost introdusa deja!"
                }
                else {
                arrayA[v1][v2] = 1;
                arrayA[v2][v1] = 1;
                
                var row = new Array(virfuri);
                for (var i = 0; i <= virfuri; i++) {
                    row[i] = 0;
                }
                    arrayI.push(row);
                muchii+=1;

                for (var i=0; i<=virfuri; i++) {
                    arrayI[mValidate][i] = 0;
                }
                    arrayI[mValidate][v1]=1;
                    arrayI[mValidate][v2]=1;
                $("#mStatus").attr('class','text-success');
                document.getElementById("mStatus").innerHTML = "Muichii introduse: "+(mValidate+1);
                
                mValidate=mValidate+1; 
                
                }

            }
            else {
                if ((arrayA[v1][v2] == 1) && (arrayA[v2][v1] == 1)) {
                    $("#mStatus").attr('class','text-danger');
                    document.getElementById("mStatus").innerHTML = "Arcul a fost introdus deja!"
                }
                else {
                arrayA[v1][v2] = 1;
                var row = new Array(virfuri);
                for (var i = 0; i <= virfuri; i++) {
                    row[i] = 0;
                }
                for (var i=muchii; i<muchii+1; i++) {
                    arrayI.push(row);
                }
                muchii+=1;
                arrayI[muchii][v1]=-1;
                arrayI[muchii][v2]=1;
                $("#mStatus").attr('class','text-success');
                document.getElementById("mStatus").innerHTML = "Arce introduse: "+(mValidate+1);
                mValidate=mValidate+1;
                
            
        
            }
            }
            }
        mainData[1] = muchii;
        //cream perechile de vifuri pentru algoritmul ford
                var data = edgeData;
                data.push([]);
                data[mainData[1]].push(parseInt(v1));
                data[mainData[1]].push(parseInt(v2));
                edgeData = data;
        incidentArray = arrayI;
    }
    
    // delete muchie

    function deleteEdge () {
        var v1 = document.getElementById("deleteV1").value;
        var v2 = document.getElementById("deleteV2").value;
        var arrayA = adiacentArray,
            arrayI = incidentArray,
            orientation = mainData[2],
            muchii = mainData[1];
            virfuri = mainData[0];
            if ((virfuri == undefined) && (orientation == undefined)) {
                $("#delMStatus").attr('class','text-danger');
                    document.getElementById("delMStatus").innerHTML = "Mai întii creați graful!";
                    return;
            }

            if ((v1 == '') && (v2 == '')) {
                $("#delMStatus").attr('class','text-danger');
                    document.getElementById("delMStatus").innerHTML = "v1 și v2 nu au fost introduse!";;
                    return;
            }
            if ((v1 == '') && !(v2 == '')) {
                $("#delMStatus").attr('class','text-danger');
                    document.getElementById("delMStatus").innerHTML = "v1 nu au fost introduse!";;
                    return;
            }

            if (!(v1 == '') && (v2 == '')) {
                $("#delMStatus").attr('class','text-danger');
                    document.getElementById("delMStatus").innerHTML = "v2 nu au fost introduse!";;
                    return;
            }
        if ((v1 > virfuri)&&(v2 > virfuri)) {
                $("#delMStatus").attr('class','text-danger');
                    document.getElementById("delMStatus").innerHTML = "Vîrful "+v1+" și "+v2+" nu există!";
            }
            else
            if (v1 > virfuri) {
                $("#delMStatus").attr('class','text-danger');
                    document.getElementById("delMStatus").innerHTML = "Vîrful "+v1+" nu există!";
            }
            else
            if (v2 > virfuri) {
                $("#delMStatus").attr('class','text-danger');
                    document.getElementById("delMStatus").innerHTML = "Vîrful "+v2+" nu există!";
            }
            else
        {
        if (orientation == 0) {
            if ((arrayA[v1][v2] == 0) && (arrayA[v2][v1] == 0)) {
                    $("#delMStatus").attr('class','text-danger');
                    document.getElementById("delMStatus").innerHTML = "Muchia a fost ștearsă deja!"
                }
                else {
                arrayA[v1][v2] = 0;
                arrayA[v2][v1] = 0;
                
                    for (var i=0; i<muchii; i++){
                        if ((arrayI[i][v1] == 1) && (arrayI[i][v2] == 1)) {
                            arrayI[i]=arrayI[muchii];
                        }
                    }
                    arrayI.pop();
                $("#delMStatus").attr('class','text-success');
                document.getElementById("delMStatus").innerHTML = "Muichii rămase: "+(mValidate-1);
                mValidate=mValidate-1;
                muchii-=1;
                }
                
            }
            else {
                if ((arrayA[v1][v2] == 0) && (arrayA[v2][v1] == 0)) {
                    $("#delMStatus").attr('class','text-danger');
                    document.getElementById("delMStatus").innerHTML = "Arcul a fost șters deja!"
                }
                else {
                arrayA[v1][v2] = 0;
                
                   for (var i=0; i<=muchii; i++){
                        if ((arrayI[i][v1] == -1) && (arrayI[i][v2] == 1)) {
                            arrayI[i]=arrayI[muchii];
                            arrayI.pop();
                            i=muchii;
                        }
                    }
                $("#delMStatus").attr('class','text-success');
                document.getElementById("delMStatus").innerHTML = "Arce rămase: "+(mValidate-1);
                mValidate=mValidate-1;
                muchii-=1;

            }
            }
        }
        mainData[1] = muchii;
        incidentArray = arrayI;

        
    }

    //strege un virf

    function deletePoint () {
        
        var vToDelete = document.getElementById("vToDelete").value;
        var virfuri = mainData[0],
            muchii = mainData[1],
            arrayA = adiacentArray,
            arrayI = incidentArray,
            ls=lista,
            orientation = mainData[2];
        
            if ((virfuri == undefined) && (orientation == undefined)) {
                $("#delVMStatus").attr('class','text-danger');
                    document.getElementById("delVMStatus").innerHTML = "Mai întii creați graful!";
                    return;
            }
            if (vToDelete == '') {
                $("#delVMStatus").attr('class','text-danger');
                    document.getElementById("delVMStatus").innerHTML = "Vîrful care urmează să fie șters nu a fost introdus!";
                    return;
            }

        if (virfuri<vToDelete) {
            $("#delVMStatus").attr('class','text-danger');
            document.getElementById("delVMStatus").innerHTML ="Vîrful "+vToDelete+" nu există!"; 
            return;
        }


        if ((orientation == 0)&&(vToDelete<=virfuri)) {
        for (var i=0; i<ls[vToDelete].length; i++) {
                arrayA[vToDelete][ls[vToDelete][i]] = 0;
                arrayA[ls[vToDelete][i]][vToDelete] = 0;
                
                    for (var j=0; j<=muchii; j++){
                        if ((arrayI[j][vToDelete] == 1) && (arrayI[j][ls[vToDelete][i]] == 1)) {
                            arrayI[j][vToDelete] = 0;
                            arrayI[j][ls[vToDelete][i]] = 0;
                            arrayI[j] = arrayI[muchii];
                                   
                    }
                    }
                mValidate--;
                arrayI.pop();
                muchii--;
        }
        var este=0;
        for (var i = 0; i <= mainData[0]; i++) {
            if (vToDelete == mainData[3][i]) {
                mainData[3].splice(vToDelete,1);
                este = 1;
            }
        }
        if (este) {
        arrayA.splice(vToDelete,1);
        for (var i = 0; i < virfuri; i++) {
            arrayA[i].splice(vToDelete,1);

        }
        for (var i = 0; i <= muchii; i++) {
            arrayI[i].splice(vToDelete,1);
        }
        $("#delVMStatus").attr('class','text-success');
        document.getElementById("delVMStatus").innerHTML ="Vîrful "+vToDelete+" a fost eliminat!";
        }
        else{
            $("#delVMStatus").attr('class','text-danger');
            document.getElementById("delVMStatus").innerHTML ="Vîrful "+vToDelete+" dat nu există";
        }
        }
        else {
        for (var i=0; i<ls[vToDelete].length; i++) {
            
                arrayA[vToDelete][ls[vToDelete][i]] = 0;
                arrayA[ls[vToDelete][i]][vToDelete] = 0;
                
                    for (var j=0; j<=muchii; j++){
                        if (((arrayI[j][vToDelete] == -1)  && (arrayI[j][ls[vToDelete][i]] == 1)) || ((arrayI[j][ls[vToDelete][i]] == -1) && (arrayI[j][vToDelete] == 1))) {
                            arrayI[j][vToDelete] = 0;
                            arrayI[j][ls[vToDelete][i]] = 0;
                            arrayI[j]=arrayI[muchii];
                            
                    }
                    }
                mValidate--;
                arrayI.pop();
                muchii--;
        }
        var este=0;
        for (var i = 0; i <= mainData[0]; i++) {
            if (vToDelete == mainData[3][i]) 
                mainData[3].splice(vToDelete,1);
                este = 1;
        }
        if (este) {
        arrayA.splice(vToDelete,1);
        for (var i = 0; i < virfuri; i++) {
            arrayA[i].splice(vToDelete,1);
        }
        
        for (var i = 0; i <= muchii; i++) {
            arrayI[i].splice(vToDelete,1);
        }
        $("#delVMStatus").attr('class','text-success');
        document.getElementById("delVMStatus").innerHTML ="Vîrful "+vToDelete+" a fost eliminat!";
        }
        else{
            $("#delVMStatus").attr('class','text-danger');
            document.getElementById("delVMStatus").innerHTML ="Vîrful "+vToDelete+" dat nu există";
        }
        }

        mainData[1] = muchii;
        virfuri--;
        mainData[0]=virfuri;
        incidentArray = arrayI;
        adiacentArray = arrayA;
        

    }
    

    //adaugarea unui virf

    function addPoint () {
           var virfuri = mainData[0],
            muchii = mainData[1],
            arrayA = adiacentArray,
            arrayI = incidentArray,
            ls=lista,
            orientation = mainData[2];
            if ((virfuri == undefined) && (orientation == undefined)) {
                $("#addVMStatus").attr('class','text-danger');
                    document.getElementById("addVMStatus").innerHTML = "Mai întii creați graful!";
                    return;
            }
            virfuri++;
            $("#addVMStatus").attr('class','text-success');
            document.getElementById("addVMStatus").innerHTML = "Vîrful "+(virfuri)+" adăugat cu success!";
           // matricea de adiacenta
           var oldArrayA = arrayA;
           
           
           arrayA = makeAdiacentArray(virfuri);
           for (var i=0; i<virfuri; i++) { 
                for (var j=0; j<virfuri; j++) {
                    if (oldArrayA[i][j] == 1) {
                    arrayA[i][j] = oldArrayA[i][j];
                    }
                }
           }
           //matricea de incidenta
           var oldArrayI = arrayI;
           arrayI = makeIncidentArray(virfuri,muchii);

           for (var i=0; i<=muchii; i++) {
                for (var j = 0; j<virfuri; j++) {
                    if (oldArrayI[i][j]==1) {
                        arrayI[i][j] = oldArrayI[i][j];
                    }
                }
           }
           for (var i = 0; i <= mainData[0]; i++) {
            if (vToDelete == mainData[3][i]) 
                mainData[3].splice(vToDelete,1);
        }
            mainData[3].push(virfuri);

           adiacentArray = arrayA;
           incidentArray = arrayI;
           mainData[0] = virfuri;
    return;
    }


    //parcurgerea grafului
    // de facut pentru parcurgerea orientat
    //Depth First Search

    function getStartPoint () {
        var x = document.getElementById('startPoint').value;
        for (var i = 0; i<=mainData[0];i++) {
        visited.splice(i,0,false);
        }
        par.splice(i,0,undefined);
        return Number(x);

    }
    
    var visited =[],par=[];
    
    
    function DFS(x) {
        var arrayA = lista;
        var ePoint = visited;
        var parents = par;
        parents.push(x);
        ePoint[x]=true;

        for (var i=0; i<=arrayA[x].length; i++) {
            if (ePoint[arrayA[x][i]] === false)  
                
                DFS(arrayA[x][i]);
        }
        visited = ePoint;
        par = parents;
    }


    function showDFS() {
        //document.getElementById('showDFS').innerHTML="";
        par.splice(0,1);
        for(var i = 0; i<par.length;i++) {
            document.getElementById('showDFS').innerHTML+=par[i];
            if (i != par.length-1) 
                document.getElementById('showDFS').innerHTML+="=>";
        }
        $("#runDFSDiv").click(function () {
            $("#showDFS").show();
        });
        
    }

    //Breadth First Search
    function getBFSData() {
        var y = document.getElementById('startBFSPoint').value;
        for (var i = 0; i<=mainData[0]; i++) {
            visBFS.splice(i,0,false);
        }
        return Number(y);
    }

    var visBFS = [],c=[];
    function BFS(y) {
        var ls = lista;
        var prim,ultim;

        visBFS[y] = true;
        c.push(y);
        prim=0;
        ultim=0;

        while (prim<=ultim) {
            y=c[prim++];

            for ( var i = 0; i < ls[y].length; i++) {
                if (!visBFS[ls[y][i]]) {
                    
                    visBFS[ls[y][i]]=true;
                    ultim++;
                    c.push(ls[y][i]);
                }
            }
        }
    }


    function showBFS() {
        //document.getElementById('showBFS').innerHTML="";
        for(var i = 0; i<c.length;i++) {
            document.getElementById('showBFS').innerHTML+=c[i];
            if (i != c.length-1) 
                document.getElementById('showBFS').innerHTML+="=>";
        }
        
    }

    //Drum minim si maxim 
    //algoritmul Ford
    var currentEdge = 0;
    function getWeight() {
        var muchiiMatrix=edgeData;
            var i=currentEdge,k;
            if (currentEdge==mainData[1]) {
                k=-1;
                
            }
            else {
                k=currentEdge+1;
            }
            if (k>=0) {
                document.getElementById('weightEdge').innerHTML="";
                document.getElementById('weightEdge').innerHTML="Ponderea pentru ("+muchiiMatrix[k][0]+","+muchiiMatrix[k][1]+")";
            }
            else {
                document.getElementById('weightEdge').setAttribute("class","text-success");
                document.getElementById('weightEdge').innerHTML="<b>Gata!</b>";
                document.getElementById('weight').setAttribute("class","form-control");
                document.getElementById('weight').setAttribute("disabled","");
                document.getElementById('insertWeight').setAttribute("disabled","");
            
            }
            var x=document.getElementById('weight').value;
            x = parseInt(x,10); 
            muchiiMatrix[i].push(x);
            document.getElementById('weightStatus').setAttribute("class","text-success");
            document.getElementById('weightStatus').innerHTML="Ponderea pentru ("+muchiiMatrix[i][0]+","+muchiiMatrix[i][1]+") sa adaugat cu succes";
            i++;
            currentEdge = i;
    }
    //afisarea muchiilor si a ponderilor 
    function showEdgeData () {
        var table = document.getElementById('showEdgeData');
        table.setAttribute("class","table table-bordered");
        table.setAttribute("style","width: 10px");
        for (var i=-1; i<=mainData[1]; i++) {
            var row = table.insertRow(table.rows.length);
            for (var j = 2; j>=-1; j--) {
                if (i===-1 && j===-1) {
                    var cell = row.insertCell(0);
                    cell.innerHTML=" ";
                }
                if (j===-1 && i>-1) {
                    var cell = row.insertCell(0);
                    cell.innerHTML=(i+1);
                }
                if (j===0 && i===-1) {
                    var cell = row.insertCell(0);
                    cell.innerHTML="X<sub>i</sub>";
                }
                if (j===1 && i===-1) {
                    var cell = row.insertCell(0);
                    cell.innerHTML="X<sub>j</sub>";
                }
                if (j===2 && i===-1) {
                    var cell = row.insertCell(0);
                    cell.innerHTML="P<sub>ij</sub>";
                }
                if (i>-1 && j>-1) {
                    var cell = row.insertCell(0);
                    cell.innerHTML=edgeData[i][j];
                }
            }
        }
    }

    var fordMinWay = [],
        h;
    function Ford(x) {
        //verificam daca exista virful x
        for (var i=0; i<mainData[0]; i++) {
            if (x === mainData[3][i]) {
                var este = 1;
                break;
            }
            else {
                este = 0;
            }
        }
        if (!este) return; 
        
        // initializam fiecare virf cu valoarea corespunzatoare
        var H =[];
        for (var i = 0; i <= mainData[0]; i++) {
            if (i == x) H.push(0);
            else H.push(Infinity);
        }
        //calculam H
        for (var i=0; i<=mainData[1];i++) {
            if ((H[edgeData[i][1]]-H[edgeData[i][0]]) < edgeData[i][2])
                continue;
            
            if ((H[edgeData[i][1]]-H[edgeData[i][0]]) == edgeData[i][2]) {
                    //alert("(=)P="+edgeData[i][2]+"| H"+edgeData[i][1]+"-H"+edgeData[i][0]+"="+(H[edgeData[i][1]]-H[edgeData[i][0]]));
                    H[edgeData[i][1]] = H[edgeData[i][0]]+edgeData[i][2];
                    //alert("H"+edgeData[i][1]+"="+H[edgeData[i][1]]);
                    continue;
                }
            if ((H[edgeData[i][1]]-H[edgeData[i][0]]) > edgeData[i][2]) {
                    //alert("(>)P="+edgeData[i][2]+"| H"+edgeData[i][1]+"-H"+edgeData[i][0]+"="+(H[edgeData[i][1]]-H[edgeData[i][0]]));
                    H[edgeData[i][1]] = H[edgeData[i][0]]+edgeData[i][2];
                    //alert("H"+edgeData[i][1]+"="+H[edgeData[i][1]]);
                    continue;
                }
        }

        //cream drumurile minime
        
        //fordMinWay.push(parseInt(mainData[0]));
        //for(var i=mainData[0]; i>=x; i--) {
            for (var j=mainData[1]; j>=0; j--) {
                if (H[edgeData[j][1]]-H[edgeData[j][0]] === edgeData[j][2]) {
                    //alert("P="+edgeData[j][2]+"| H"+edgeData[j][1]+"-H"+edgeData[j][0]+"="+H[edgeData[j][1]]+"-"+H[edgeData[j][0]]+"="+(H[edgeData[j][1]]-H[edgeData[j][0]]));
                    
                    fordMinWay.push(edgeData[j][0]);

                }
            }
        //}
        console.log(fordMinWay);
        h=H;
    }
    //Afisarea Vectorului H
        function showH (H){
        var table = document.getElementById('showH');
        table.setAttribute("class","table table-bordered");
        document.getElementById('tabs-2').setAttribute("style","float: left; width: 100%;");
        table.setAttribute("style","width: 10px");
        for (var i=0; i<=mainData[0]; i++) {
            var row = table.insertRow(table.rows.length);
            for (var j=0; j>=-1; j--) {
                if (j === -1 && i>=0) { 
                    var cell = row.insertCell(0);
                    cell.innerHTML="H<sub>"+i+"</sub>";
                }
                else{
                    var cell = row.insertCell(0);
                    cell.innerHTML=H[i];
                }
            }
        }
        }

    //algoritmul bellman-kalaba
    var minBKWay;
    function bk(xs,xf) {
        // cream matricea drumurilor
        var wayMatrix = [];
        for(var i=0; i<=mainData[0]; i++) {
            wayMatrix.push([]);
            for( var j = 0; j <=mainData[0]; j++) {
                wayMatrix[j].push([]);
                wayMatrix[i][j] = 0;
            }
        }
        //initializam matricea cu valorile necesare
        for (var i = 0; i<=mainData[0]; i++) {
            for (var j = 0; j<=mainData[0]; j++) {
                for (k=0; k<=mainData[1]; k++)
                if (adiacentArray[i][j] === 1 && edgeData[k][0] === i && edgeData[k][1] === j)
                    wayMatrix[i][j] = edgeData[k][2];
                }
                 if (adiacentArray[i][j] === 0) {
                    wayMatrix[i][j] = Infinity;
                 }
                 if (i === j) {
                    wayMatrix[i][j] = 0;
                 }
        }
        
        //calculam vectorul v
        var min=Infinity;
        var temp;
        while (v!==wayMatrix[wayMatrix.length-1]) {
            var v=[];
            for(var i=0; i <= mainData[0]; i++) {
                temp = [];
                for (var j=0; j <= mainData[0];j++) {
                    temp.push(wayMatrix[i][j]+wayMatrix[mainData[0]][j]);
                }
                for (var k=0; k<= mainData[0]; k++) {
                    if (temp[k]<min) min=temp[k];
                }
                v.push(min);
            }
            wayMatrix.push(v);
        }
        //determinam valorile drumul minim
        var min=Infinity;
        var minBKWayValue;
        for (var i=0; i<=mainData[0]; i++) {
            for (var j=0; j<=mainData[0]; j++) {
                var temp;
                if (j!=1) temp.push(wayMatrix[wayMatrix.length][j]+wayMatrix[i][j]); 
            }
            for (var k=0; k<= mainData[0]; k++) {
                    if (temp[k]<min) min=temp[k];
            }
            minBKWayValue.push(min);
        }
        //cream drumul minim
            var minWay;
            for (var i=0; i<=mainData[0];i++) {
                if (minBKWayValue!==undefined && wayMatrix[wayMatrix.length][i] === minBKWayValue[i]) {
                    minWay.push(i);
                }
            }
            minBKWay = minWay;
    }

    // jquery  



    $(function() {
        $("#tabs-1").dialog({
            autoOpen: false,

            show: {
                effect: "blind",
                duration: 500
            }
        }).position({

        });

        $("#openGr1").click(function() {
            $("#tabs-1").removeClass("active");
            $("#tabs-1").dialog("open");
        });
    });

    $(function() {
        $("#tabs-2").dialog({
            autoOpen: false,

            show: {
                effect: "blind",
                duration: 500
            }
        }).position({

        });

        $("#openGr2").click(function() {
            $("#tabs-2").removeClass("active");
            $("#tabs-2").dialog("open");
        });
    });

    $(function() {
        $("#tabs-3").dialog({
            autoOpen: false,

            show: {
                effect: "blind",
                duration: 500
            }
        }).position({

        });

        $("#openGr3").click(function() {
            $("#tabs-3").removeClass("active");
            $("#tabs-3").dialog("open");
        });
    });

    $(function() {
        $("#tabs-4").dialog({
            autoOpen: false,

            show: {
                effect: "blind",
                duration: 500
            }
        }).position({

        });

        $("#openGr4").click(function() {
            $("#tabs-4").removeClass("active");
            $("#tabs-4").dialog("open");
        });
    });

    $(function(){
        $("#aMatrixDiv").dialog({
            autoOpen: false,
            show: {
                effect: "blind",
                duration: 500
            }
        });

        $("#aMatrix").click(function() {
            $("#aMatrix").removeClass("active");
            $("#aMatrixDiv").dialog("open");
        });
    });
    
    $(function(){
        $("#iMatrixDiv").dialog({
            autoOpen: false,
            show: {
                effect: "blind",
                duration: 500
            }
        });

        $("#iMatrix").click(function() {
            $("#iMatrix").removeClass("active");
            $("#iMatrixDiv").dialog("open");
        });
    });

    $(function(){
        $("#listDiv").dialog({
            autoOpen: false,
            show: {
                effect: "blind",
                duration: 500
            }
        });

        $("#list").click(function() {
            $("#list").removeClass("active");
            $("#listDiv").dialog("open");
        });
    });

    $(function() {
        $( "#tabs" ).tabs();
    });

    $(function(){
        $("#wMatrixDiv").dialog({
            autoOpen: false,
            show: {
                effect: "blind",
                duration: 500
            }
        });

        $("#wMatrix").click(function() {
            $("#wMatrix").removeClass("active");
            $("#wMatrixDiv").dialog("open");
        });
    });

    $(function(){
        $("#goDiv").dialog({
            autoOpen: false,
            width: 600,
            
            show: {
                effect: "blind",
                duration: 500
            }
        });
        $("#showDFSDiv").hide();

        $("#buttonDFS").click(function() {
            $("#buttonDFS").removeClass("active");
            $("#goDiv").dialog("open");
        });
    });

    $(function () {
        $("#runDFS").click(function(){
            $("#showDFSDiv").show("slow");
        });
        
    });

    $(function(){
        $("#goBFSDiv").dialog({
            autoOpen: false,
            width: 600,
            
            show: {
                effect: "blind",
                duration: 500
            }
        });
        $("#showBFSDiv").hide();

        $("#buttonBFS").click(function() {
            $("#buttonBFS").removeClass("active");
            $("#goBFSDiv").dialog("open");
        });
    });
    
    $(function () {
        $("#runBFS").click(function(){
            $("#showBFSDiv").show("slow");
        });
        
    });

    $(function(){
        $("#fordDiv").dialog({
            autoOpen: false,
            width: 608,

            show: {
                effect: "blind",
                duration: 500
            }
        });

        $(function(){
            $("#tabs").tabs().addClass("ui-tabs-vertical ui-helper-clearfix");
            $("#tabs li").removeClass("ui-corner-top").addClass("ui-corner-left");
        });

        $("#fordOpen").click(function(){
            $("#fordDiv").dialog("open");
            if (edgeData[0] != undefined) document.getElementById('weightEdge').innerHTML="Ponderea pentru ("+edgeData[0][0]+","+edgeData[0][1]+")";
        });
    });