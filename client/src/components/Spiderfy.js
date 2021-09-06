import React from "react";
import PropTypes from "prop-types";
import { Map, Marker } from "google-maps-react";

class Spiderfy extends React.Component {
  static contextTypes = {
    [Map]: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    const oms = require(`npm-overlapping-marker-spiderfier/lib/oms.min`);
    this.oms = new oms.OverlappingMarkerSpiderfier(this.context[Map], {});
    this.markerNodeMounted = this.markerNodeMounted.bind(this);
  }

  async markerNodeMounted(ref) {
    const marker = ref.state[Marker];
    this.oms.addMarker(marker);
    window.google.maps.event.addListener(marker, "spider_click", (e) => {
      if (this.props.onSpiderClick) this.props.onSpiderClick(e);
    });
  }

  render() {
    return React.Children.map(this.props.children, (child) =>
      React.cloneElement(child, { ref: this.markerNodeMounted })
    );
  }
}

export default Spiderfy;
