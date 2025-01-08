import React from "react";
import GitHubCalendar from "react-github-contribution-calendar";

<div>
      <h1>My GitHub Contribution Heatmap</h1>
      <GitHubCalendar
        username="your-github-username" // Replace with your GitHub username
        blockSize={15} // Size of each block
        blockMargin={5} // Space between blocks
        fontSize={14} // Font size for date numbers
        theme={{
          background: 'transparent',
          text: '#000',
          grade4: '#004d00',
          grade3: '#3e8e41',
          grade2: '#7fbd6f',
          grade1: '#b5e685',
          grade0: '#e0f9e0',
        }}
      />
</div>

export default Heatmap;