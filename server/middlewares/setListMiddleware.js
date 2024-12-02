const setProcessField = function (next) {
    if (this.currentEpisode) {
      if (this.currentEpisode.startsWith("Hoàn tất") || this.currentEpisode.startsWith("FULL")) {
        this.process = "Complete";
      } else {
        this.process = "On-going";
      }
    }
    next();
  };

  const setTotalEpisode = function (next) {
    if (this.currentEpisode) {
        // Case 1: currentEpisode starts with "FULL"
        if (this.currentEpisode.toLowerCase().startsWith("full")) {
            this.totalUploadEpisodes = 2;
        }
        // Case 2: currentEpisode starts with "hoàn tất"
        else if (this.currentEpisode.toLowerCase().startsWith("hoàn tất")) {
            // Extract the value between "(" and "/"
            const match = this.currentEpisode.match(/\((\d+)\//);
            if (match && match[1]) {
                this.totalUploadEpisodes = parseInt(match[1], 10); // Convert to integer
            }
        }
        // Case 3: currentEpisode starts with "Tập"
        else if (this.currentEpisode.toLowerCase().startsWith("tập")) {
            // Extract the value after the first space
            const parts = this.currentEpisode.split(" ");
            if (parts.length > 1) {
              this.totalUploadEpisodes = parseInt(parts[1], 10); // Convert to integer
            }
        }
    }

    next();
};

export default { setProcessField, setTotalEpisode};