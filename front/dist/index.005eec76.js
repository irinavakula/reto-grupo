$(function() {
    function getPartidos() {
        $.get("http://localhost:1234/api/partidos").done(function(data) {
            var table = $(".table-group-divider");
            console.log(data);
            data.forEach((partido)=>{
                const row = `
          <tr>
            <td>${partido.nombre}</td>            
            <td>${partido.deporte}</td>
            <td>${partido.apuesta}</td>
            <td>${partido.resultado}</td>
            <td><button id="detalle" data-id=${partido.id}>Detalle</button></td>      
            <td><button id="borrar" data-id=${partido.id}>Borrar</button></td> 
            <td><button id="ganar" data-id=${partido.id}>Ganar</button></td> 
            <td><button id="perder"data-id=${partido.id}>Pierde</button></td>
            <td><button id="modificar"data-id=${partido.id}>Modificar</button></td>
          </tr>          
        `;
                table.append(row);
            });
            console.log($("#detalle"));
        }).fail(function() {
            alert("Error ok");
        });
    }
    function refreshPartidos() {
        var table = $(".table-group-divider");
        table.empty();
        getPartidos();
    }
    refreshPartidos();
    $(document).on("click", "#detalle", function() {
        const partidoId = $(this).data("id");
        console.log(partidoId);
        $.get("http://localhost:1234/api/partidos/" + partidoId).done(function(data) {
            $("#id").val(data.id);
            $("#nombrePartido").val(data.nombre);
            $("#descripcionPartido").val(data.descripcion);
            $("#deporte").val(data.deporte);
            $("#resultado").val(data.resultado);
            $("#apuestaPartido").val(data.apuesta);
            $(".zonaDetalle").show();
        }).fail(function() {
            alert("Lox");
        });
    });
    $(document).on("click", "#botonCancelar", function() {
        $(".zonaDetalle").hide();
    });
    $(document).on("click", "#borrar", function() {
        const partidoId = $(this).data("id");
        console.log(partidoId);
        $.ajax({
            method: "DELETE",
            url: "http://localhost:1234/api/partidos/" + partidoId
        }).done(function(data) {
            console.log("Resultado del borrado: " + data);
            refreshPartidos();
        });
    });
    $(document).on("click", "#refrescar", function() {
        refreshPartidos();
    });
    $(document).on("click", "#ganar", function() {
        const partidoId = $(this).data("id");
        const gana = $(this).data();
        $.post("http://localhost:1234/api/partidos/" + partidoId + "/gana");
        refreshPartidos();
    });
    $(document).on("click", "#perder", function() {
        const partidoId = $(this).data("id");
        const pierde = $(this).data();
        $.post("http://localhost:1234/api/partidos/" + partidoId + "/pierde");
        refreshPartidos();
    });
});

//# sourceMappingURL=index.005eec76.js.map
