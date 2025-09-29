    const fetchBtn = document.getElementById('fetchBtn');
    const byteRangeInput = document.getElementById('byteRange');
    const output = document.getElementById('output');

    fetchBtn.addEventListener('click', async () => {
      const rangeText = byteRangeInput.value.trim();
      const match = rangeText.match(/^(\d+)-(\d+)$/);
      if (!match) {
        alert('Invalid format! Use start-end (numbers only)');
        return;
      }
      const start = parseInt(match[1]);
      const end = parseInt(match[2]);
      if (end < start) {
        alert('End must be greater than start');
        return;
      }

      try {
        const headers = { 'Range': `bytes=${start}-${end}` };
        const resp = await fetch('about.html', { headers });

        if (resp.status === 206 || resp.status === 200) {
          const buffer = await resp.arrayBuffer();
          // convert bytes to string
          const text = new TextDecoder("utf-8").decode(buffer);
          output.value = text;
        } else {
          output.value = `Error fetching: HTTP ${resp.status}`;
        }
      } catch (err) {
        output.value = 'Fetch error: ' + err;
      }
    });