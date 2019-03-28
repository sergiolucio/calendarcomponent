package cg.sergiolucio.rest;

import cg.sergiolucio.model.AnualCalendar;
import cg.sergiolucio.model.MonthlyCalendar;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/")
@Produces(MediaType.APPLICATION_JSON)
public class CalendarRestServiceImpl {
    @GET
    @Path("/getAnual")
    public Response anual() {
        AnualCalendar teste = new AnualCalendar();

        return Response.status(200).header("Access-Control-Allow-Origin", "*").entity(teste.toString()).build();
    }

    @GET
    @Path("/getMonthly")
    public Response montlhy() {
        MonthlyCalendar teste = new MonthlyCalendar();

        return Response.status(200).header("Access-Control-Allow-Origin", "*").entity(teste.toString()).build();
    }
}
