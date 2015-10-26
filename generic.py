#!/usr/bin/python
import sys
# arg1 is the script name
# arg2 is what we want

if len(sys.argv) == 1:
  raise ValueError('Sense-Hat function name missing'); 

from sense_hat import SenseHat
sense = SenseHat()

# print len(sys.argv)
# print sys.argv
# print sys.argv[1]
# print *sys.argv[2:]

if len(sys.argv) == 2:
  result = getattr(sense, sys.argv[1])()
else:
  result = getattr(sense, sys.argv[1])(*sys.argv[2:])

import json
print json.dumps(result)
# sense.show_message(sys.argv[1])
