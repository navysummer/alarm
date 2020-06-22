import sys
import logging
from pyzabbix import ZabbixAPI


stream = logging.StreamHandler(sys.stdout)
stream.setLevel(logging.ERROR)
log = logging.getLogger('pyzabbix')
log.addHandler(stream)
log.setLevel(logging.ERROR)


class Zabbix():
    def __init__(self, url, user, password):
        self.client = ZabbixAPI(url)
        self.client.login(user, password)

    def get_events(self, args=None):
        params = {
            "output": "extend",
            "selectHosts": ['hostid', 'host'],
            "selectRelatedObject": ['triggerid', 'description', 'priority', 'status', 'state', 'value', 'lastchange']
        }
        if args and isinstance(args, dict):
            params.update(args)
        events = self.client.event.get(**params)
        return events

    def get_trigger(self, args=None):
        params = {
            "output": "extend",
            "expandExpression": True,
            "expandDescription": True
        }
        if args and isinstance(args, dict):
            params.update(args)
        triggers = self.client.trigger.get(**params)
        return triggers

