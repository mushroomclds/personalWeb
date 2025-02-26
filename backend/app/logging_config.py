import logging
import sys

# Configure logging to output to both stdout and a file
logging.basicConfig(
    level=logging.INFO,  # Set logging level
    format="%(asctime)s - %(levelname)s - %(filename)s:%(lineno)d - %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout),  # Log to stdout
        logging.FileHandler("app.log", mode="w")  # Log to a file (append mode)
    ]
)

logger = logging.getLogger(__name__)
