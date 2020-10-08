import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {primaryColor} from '../../../styles/ComThemeStyle';
import DateTimePicker from '@react-native-community/datetimepicker';

import {TextInput} from 'react-native-paper';
import {Col, Row} from 'react-native-easy-grid';

import moment from 'moment';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class ComBadrDatePickerComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDate: false,
      showTime: false,
      dateValue: props.value ? props.value : '',
      timeValue: props.timeValue ? props.timeValue : '',
      mode: 'date',
    };
  }

  onTimeChange = (event, selectedTime) => {
    this.setState({
      timeValue: selectedTime,
      showTime: false,
      showDate: false,
    });
    this.props.onTimeChanged(
      moment(selectedTime).format(
        this.props.heureFormat ? this.props.heureFormat : 'HH:mm',
      ),
    );
  };

  onDateChange = (event, selectedDate) => {
    this.setState({
      dateValue: selectedDate,
      showTime: false,
      showDate: false,
    });
    this.props.onDateChanged(
      moment(selectedDate).format(
        this.props.dateFormat ? this.props.dateFormat : 'DD/MM/YYYY',
      ),
    );
  };

  showDatepicker = () => {
    this.setState({
      mode: 'date',
      showDate: true,
      showTime: false,
      dateValue: new Date(),
    });
  };

  showTimepicker = () => {
    this.setState({
      mode: 'time',
      showTime: true,
      showDate: false,
      timeValue: new Date(),
    });
  };

  render() {
    return (
      <View>
        {this.state.showDate && (
          <DateTimePicker
            style={{backgroundColor: primaryColor}}
            textColor={primaryColor}
            minimumDate={this.props.minimumDate}
            testID="dateTimePicker"
            value={this.state.dateValue}
            mode={'date'}
            is24Hour={true}
            display={this.props.display ? this.props.display : 'default'}
            onChange={this.onDateChange}
          />
        )}

        {this.state.showTime && (
          <DateTimePicker
            style={{backgroundColor: primaryColor}}
            textColor={primaryColor}
            minimumDate={this.props.minimumDate}
            testID="dateTimePicker"
            value={this.state.timeValue}
            mode="time"
            is24Hour={true}
            display={this.props.display ? this.props.display : 'default'}
            onChange={this.onTimeChange}
          />
        )}

        <Row>
          <Col size={94}>
            <TouchableOpacity onPress={() => this.showDatepicker()}
                              hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
                              disabled={this.props.readonly}>
              <TextInput
                disabled="true"
                underlineColor={primaryColor}
                mode="outlined"
                value={
                  this.state.dateValue
                    ? moment(this.state.dateValue).format(
                        this.props.dateFormat
                          ? this.props.dateFormat
                          : 'DD/MM/YYYY',
                      )
                    : ''
                }
                label={this.props.labelDate}
                style={this.props.inputStyle}
              />
            </TouchableOpacity>
          </Col>
          <Col size={10}>
            <Icon
              name="calendar-o"
              style={styles.iconInput}
              color={primaryColor}
              size={18}
            />
          </Col>

          {this.props.onTimeChanged && (
            <Col size={50}>
              <Row>
                <Col size={80}>
                  <TouchableOpacity onPress={this.showTimepicker}
                                    hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
                                    disabled={this.props.readonly}>
                    <TextInput
                      disabled="true"
                      underlineColor={primaryColor}
                      mode="outlined"
                      value={
                        this.state.timeValue
                          ? moment(this.state.timeValue).format(
                              this.props.heureFormat
                                ? this.props.heureFormat
                                : 'HH:mm',
                            )
                          : ''
                      }
                      label={this.props.labelHeure}
                      style={this.props.inputStyle}
                    />
                  </TouchableOpacity>
                </Col>

                  <Col size={20}>
                      <Icon
                          name="clock-o"
                          style={styles.iconInput}
                          color={primaryColor}
                          size={18}
                      />
                  </Col>
              </Row>
              </Col>
          )}
        </Row>
      </View>
    );
  }
}

const styles = {
  inputContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingBottom: 10,
  },
  inputStyle: {
    padding: 10,
  },
  iconInput: {
    paddingTop: 35,
  },
};
