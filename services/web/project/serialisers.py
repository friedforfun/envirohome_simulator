from marshmallow import Schema, fields

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
    'room_name': fields.Str(),
    'total_power': fields.Int(),
    'device_count': fields.Int(),
    'current_power': fields.Int()
})

DeviceSchema = Schema.from_dict({
    'device_id': fields.Int(),
    'device_name': fields.Str(required=True),
    'rated_power': fields.Int(required=True),
    'type': fields.Str(),
    'is_fault': fields.Boolean(),
    'is_on': fields.Boolean(),
    'is_generator': fields.Boolean(),
    'room_id': fields.Int(required=True)
})


class TVSchema(DeviceSchema):
    channel = fields.Int()
    output = fields.Str()
    volume = fields.Int()


class ThermostatSchema(DeviceSchema):
    temp = fields.Int(required=True)


class LightSchema(DeviceSchema):
    intensity = fields.Int(required=True)
    colour = fields.Int(required=True)


def get_device_model(type):
    models = {
        'plug': DeviceSchema,
        'solar': DeviceSchema,
        'tv': TVSchema,
        'thermostat': ThermostatSchema,
        'lights': LightSchema,
    }
    return models.get(type)
