from marshmallow import Schema, fields

#room_model = api.model('Room', {
#    'room_id': fields.Integer(readOnly=True, description='Room ID'),
#    'room_name': fields.Str(required=True, description='Room Name'),
#    'devices': fields.List(fields.Nested(device_model))
#})
#
#tv_model = api.inherit('TV', device_model, {
#    'channel': fields.Integer(description='Current TV Channel'),
#    'output': fields.Str(description='Current Output Method'),
#    'volume': fields.Integer(description='Current Volume')
#})
#
#thermostat_model = api.inherit('Thermostat', device_model, {
#    'temp': fields.Integer(description='Current temperature')
#})
#
#light_model = api.inherit('Light', device_model, {
#    'intensity': fields.Integer(description='Intensity of light'),
#    'colour': fields.Integer(description='Colour as decimal colour code')
#})
#
#
#def get_device_model(type):
#    models = {
#        'plug': device_model,
#        'tv': tv_model,
#        'thermostat': thermostat_model,
#        'lights': light_model,
#    }
#    return models.get(type)

UsageSchema = Schema.from_dict({
    'device_id': fields.Int(),
    'date': fields.Str(),
    'time': fields.Str(),
    'energy_usage': fields.Float()
    })


UserSchema = Schema.from_dict({
    "username": fields.Str(required=True),
    "email": fields.Email(required=True),
    "password": fields.Str(required=True)})

LoginSchema = Schema.from_dict({
    "email": fields.Email(required=True),
    "password": fields.Str(required=True)})

RoomSchema = Schema.from_dict({
    'room_id': fields.Int(),
    'room_name': fields.Str()
})

DeviceSchema = Schema.from_dict({
    'device_id': fields.Int(required=True),
    'device_name': fields.Str(required=True),
    'rated_power': fields.Integer(required=True),
    'type': fields.Str(required=True),
    'is_fault': fields.Boolean(required=True),
    'is_on': fields.Boolean(required=True),
    'room_id': fields.Integer(required=True)
})
