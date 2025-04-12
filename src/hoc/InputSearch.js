import React from "react";
import { injectIntl } from "react-intl";

class InputSearch extends React.Component {
  render() {
    const { intl } = this.props;
    const searchClinic = intl.formatMessage({ id: "banner.search-clinic" });
    return <input type="text" placeholder={searchClinic} />;
  }
}
export default injectIntl(InputSearch);
