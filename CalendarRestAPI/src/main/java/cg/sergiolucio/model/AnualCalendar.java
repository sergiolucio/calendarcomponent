package cg.sergiolucio.model;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.util.Arrays;

public class AnualCalendar {

    public String toString() {

        JSONObject monthAux = new JSONObject();
        JSONObject anualData = new JSONObject();

        int numberOfMonths = (int)(Math.random() * 5);
        int monthsOff[] = new int[numberOfMonths];

        for (int l = 0; l < numberOfMonths; l++) {

            JSONObject month = new JSONObject();




            int numberOfDays = (int) (Math.random() * 10) + 1;
            int daysOff[] = new int[numberOfDays];

            JSONObject daysAux = new JSONObject();

            for (int j = 0; j < numberOfDays; j++) {

                JSONObject day = new JSONObject();

                int numberOfEvts = (int) (Math.random() * 5) + 1;
                JSONArray eventsArray = new JSONArray();

                for (int i = 0; i < numberOfEvts; i++) {

                    int randomCodeColor = (int) (Math.random() * 4);
                    int code[] = {1, 2, 3, 4};
                    String color[] = {"#f2a654", "#57c7d4", "#8daaba", "#46be8a"};
                    String evtDescription = "Evento " + (i + 1);

                    JSONObject type = new JSONObject();
                    type.put("codigo", code[randomCodeColor]);
                    type.put("color", color[randomCodeColor]);
                    type.put("descricao", evtDescription);
                    type.put("prioridade", (int) (Math.random() * 4) + 1);

                    JSONObject event = new JSONObject();
                    event.put("body", "Body of the event!");
                    event.put("type", type);

                    eventsArray.add(event);
                }

                int randomDay;
                do {
                    randomDay = (int) (Math.random() * 31) + 1;
                } while (Arrays.asList(daysOff).contains(randomDay));

                daysOff[j] = randomDay;

                day.put("day", randomDay);
                day.put("isHoliday", "false");
                day.put("isWeekend", "false");
                day.put("events", eventsArray);

                daysAux.put(randomDay, day);
            }


            int monthNumber;
            do {
                monthNumber = (int)(Math.random() * 12) + 1;
            } while (Arrays.asList(monthsOff).contains(monthNumber));

            monthsOff[l] = monthNumber;

            month.put("month", monthNumber);
            month.put("days", daysAux);

            monthAux.put(monthNumber, month);
        }

        anualData.put("year", "2019");
        anualData.put("items", monthAux);
        anualData.put("weekStartDay", "Monday");


        return anualData.toString();

    }
}
