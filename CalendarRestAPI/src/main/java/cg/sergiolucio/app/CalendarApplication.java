package cg.sergiolucio.app;

// import the rest service you created!
import cg.sergiolucio.rest.CalendarRestServiceImpl;

import javax.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

public class CalendarApplication extends Application {
    private Set<Object> singletons = new HashSet<Object>();
    public CalendarApplication() {
        // Register our calendar service
        singletons.add(new CalendarRestServiceImpl());
    }

    @Override
    public Set<Object> getSingletons() {
        return singletons;
    }
}
