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

    def get_events(self, params=None):
        if not params or not  isinstance(params, dict):
            params = {
                "output": "extend"
            }
        events = self.client.event.get(**params)
        return events

    def get_triggers(self, params=None):
        if not params or not isinstance(params, dict):
            params = {
                "output": "extend"
            }
        triggers = self.client.trigger.get(**params)
        return triggers

