import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Light from '../components/light';
import Tv from '../components/tv';
import Thermo from '../components/thermo';
import Plug from '../components/plug';

const API = 'http://192.168.86.26:5000/';
const DEVICES = 'api/devices';
const ROOMS = ['living_room', 'kitchen', 'outside'];

class Webapi extends Component {
  /**
   * Construct component class
   * @param {object} props
   */
   
  constructor (props: {}) {
    super(props);
    this.state = {
        isLoading: true,
        dataSource: []
    };
  }

componentDidMount () {
    fetch(API+DEVICES)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson
        })
      });
      //.catch(error => console.log(error));
}

toggle_power(device_id){
  fetch(API+"api/device/power/"+device_id).then((response) => response.json()).then(console.log(responsejson));
}

render_room(){
  const device_type_enum = device => ({
          tv: <Tv key={device.device_id} on={device.on} onPress={() => {
            this.toggle_power(device.device_id);
          } } />,
          lights: <Light key={device.device_id} on={device.on} onPress={() => {
            this.toggle_power(device.device_id);
          } }/>,
          plug: <Plug key={device.device_id} on={device.on} onPress={() => {
            this.toggle_power(device.device_id);
          } }/>,
          thermo: <Thermo key={device.device_id} on={device.on} onPress={() => {
            this.toggle_power(device.device_id);
          } }/>
          });

  const devices_to_render = [];
    for (let device of this.state.dataSource) {
      if(device.room == this.props.myRoom){
        devices_to_render.push(device_type_enum(device)[device.device_type]);
      }
    }
    return (<View style = {styles.iconboard}>{ devices_to_render }</View>);
}

render(){
  return(
    <View>
      { this.render_room() }
      <Text>{this.state.isLoading ? "Loading Device data" : ""}</Text>
    </View>
    );
}

}

const styles= StyleSheet.create({
  iconboard: {

    flex: 1,
    flexDirection: 'row',
    justifyContent : 'center',
    alignItems     : 'center',
    borderBottomLeftRadius:30,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  }
  });
export default Webapi;
