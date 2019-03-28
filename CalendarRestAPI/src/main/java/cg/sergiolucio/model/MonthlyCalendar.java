package cg.sergiolucio.model;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.util.Arrays;

public class MonthlyCalendar {

    public String toString() {

        JSONObject item = new JSONObject();
        int numberOfItems = (int) (Math.random() * 5) + 1;
        int itemsOff[] = new int[numberOfItems];

        for (int k = 0; k < numberOfItems; k++) {

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

            JSONObject days = new JSONObject();
            days.put("days", daysAux);

            int itemRandom;

            do {
                itemRandom = 10000 + (int) (Math.random() * 12345);
            } while (Arrays.asList(itemsOff).contains(itemRandom));

            String itemId = "IT-" + itemRandom;

            item.put(itemId, days);
        }

        JSONObject monthlyData = new JSONObject();
        monthlyData.put("weekStartDay", "Monday");
        monthlyData.put("items", item);

        return monthlyData.toString();
    }


}
