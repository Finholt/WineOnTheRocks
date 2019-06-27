import React, { Component } from 'react';

class Calendar extends Component {
  render() {
    return (
      <div className="Calendar">
        <iframe src="https://calendar.google.com/calendar/b/2/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FChicago&amp;src=d2luZW9udGhlcm9ja3N0cml2aWFAZ21haWwuY29t&amp;src=amVzc2kuc3B1cnJlbGxAZ21haWwuY29t&amp;src=c2VhZmlubnlAZ21haWwuY29t&amp;color=%23039BE5&amp;color=%23616161&amp;color=%23A79B8E&amp;showTz=0&amp;mode=WEEK&amp;showTitle=0&amp;showPrint=0&amp;showTabs=0" width="800" height="600" frameborder="0" scrolling="no"></iframe>
      </div>
    );
  }
}

export default Calendar;