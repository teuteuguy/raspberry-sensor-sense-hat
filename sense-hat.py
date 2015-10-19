from sense_hat import SenseHat

sense = SenseHat()

result = { 'temperatureFromHumidity': -1, 'temperatureFromPressure': -1, 'humidity': -1, 'pressure': -1 }

result['temperatureFromHumidity'] = sense.get_temperature_from_humidity()
result['temperatureFromPressure'] = sense.get_temperature_from_pressure()
result['humidity'] = sense.get_humidity()
result['pressure'] = sense.get_pressure()

import json

print(json.dumps(result))
