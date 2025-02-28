import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from flask import Flask

app = Flask(__name__)

from . import logging_config
from . import oracle_db
from . import create_tables
from . import routes