from pathlib import Path


def rename_psd_files() -> None:
    root = Path.cwd()
    renamed = 0
    skipped = 0
    failed = 0

    print(f"Scanning for .psd files under: {root}")

    try:
        files = (path for path in root.rglob("*") if path.is_file() and path.suffix.lower() == ".psd")
        for source in files:
            destination = source.with_suffix(".pst")

            if destination.exists():
                print(f"Skipped (destination already exists): {source}")
                skipped += 1
                continue

            try:
                source.rename(destination)
                print(f"Renamed: {source} -> {destination}")
                renamed += 1
            except OSError as error:
                print(f"Failed (possibly locked or inaccessible): {source}")
                print(f"Reason: {error}")
                failed += 1
    except OSError as error:
        print(f"Could not scan '{root}': {error}")
        return

    print(f"Finished. Renamed: {renamed}; skipped: {skipped}; failed: {failed}.")


if __name__ == "__main__":
    rename_psd_files()