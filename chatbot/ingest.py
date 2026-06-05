import sys
import os
from rag import ingest_pdf

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DOCUMENT_PATHS = [
    os.path.normpath(os.path.join(BASE_DIR, "..", "pdf1.pdf")),
    os.path.normpath(os.path.join(BASE_DIR, "..", "pdf2.pdf"))
]

if __name__ == "__main__":
    paths_to_ingest = DOCUMENT_PATHS.copy()
    
    if len(sys.argv) > 1:
        paths_to_ingest.extend(sys.argv[1:])

    if not paths_to_ingest:
        print("No documents provided. Please add paths to DOCUMENT_PATHS or provide them as command-line arguments.")
    else:
        for path in paths_to_ingest:
            try:
                ingest_pdf(path)
            except Exception as e:
                print(f"Error ingesting PDF '{path}': {e}")
