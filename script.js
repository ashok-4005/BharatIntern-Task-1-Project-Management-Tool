document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function fetchIssues() {
    var issues = JSON.parse(localStorage.getItem('issues')) || [];
    var issuesList = document.getElementById('issuesList');

    issuesList.innerHTML = '';

    for (var i = 0; i < issues.length; i++) {
        var id = issues[i].id;
        var desc = issues[i].description;
        var severity = issues[i].severity;
        var assignedTo = issues[i].assignedTo;
        var status = issues[i].status;

        var issueElement = document.createElement('div');
        issueElement.classList.add('well');
        issueElement.innerHTML = `
            <h3>${desc}</h3>
            <p><span class="glyphicon glyphicon-folder-open"></span> ${severity}
                <span class="glyphicon glyphicon-user"></span> ${assignedTo}
            </p>
            <p>Status: ${status}</p>
            <a href="#" class="btn btn-success" onclick="setStatusClosed('${id}')">
                <i class="far fa-check-circle"></i>&nbsp;Mark as Completed
            </a>
            <a href="#" class="btn btn-danger" onclick="deleteIssue('${id}')">
                <i class="glyphicon glyphicon-trash"></i> Delete
            </a>
        `;

        issuesList.appendChild(issueElement);
    }
}

function saveIssue(e) {
    e.preventDefault();
    var issueId = chance.guid();
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    var issueStatus = 'Pending';

    var issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    };

    var issues = JSON.parse(localStorage.getItem('issues')) || [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));

    document.getElementById('issueInputForm').reset();
    fetchIssues();
}

function setStatusClosed(id) {
    var issues = JSON.parse(localStorage.getItem('issues')) || [];

    for (var i = 0; i < issues.length; i++) {
        if (issues[i].id === id) {
            issues[i].status = 'Completed';
            break;
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}

function deleteIssue(id) {
    var issues = JSON.parse(localStorage.getItem('issues')) || [];

    for (var i = 0; i < issues.length; i++) {
        if (issues[i].id === id) {
            issues.splice(i, 1);
            break;
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}

// Initial fetch of issues when the page loads
fetchIssues();
