import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";


const localizer = dayjsLocalizer(dayjs);

const ReactFullCalendar = () => {
  const components = {
    event: (props) => {
      return (
        <div
          {...props.event.props}
          className="text-left shadow-xl bg-cyan-800 "
        >
          {props.event.title}
          <p>Cliente: {props.event.user}</p>
        </div>
      );
    },
  };

  const eventStyleGetter = () => {
    return {
      style: {
        backgroundColor: "#115e75",
        color: "white",
        borderRadius: "8px",
        padding: "5px",
      },
    };
  };

  return (
    <div className="h-screen ">
      <Calendar
        defaultView="month"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        components={components}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default ReactFullCalendar;
