document.addEventListener('DOMContentLoaded', function () {
    const modalContent = {
        home: {
            title: 'Home',
            content: `<p>Welcome to my space! This is where I share my thoughts, projects, and creative work.</p>`
        },
        about: {
            title: 'About',
            content: `<p>idk.. i exist</p>`
        },
        journal: {
            title: 'Journal',
            content: `<p>this should be a link out?</p>`
        }
    };

    const links = document.querySelectorAll('.music-note-link');
    const modalContainer = document.getElementById('modal-container');
    let modalCounter = 0;
    const openModals = new Set(); // Track which modals are currently open

    // Function to get random corner position
    function getRandomCorner() {
        const corners = [
            { top: '50%', right: '50%' },     // top-right
            // { bottom: '5%', left: '5%' },   // bottom-left
            // { bottom: '5%', right: '5%' },  // bottom-right
            // { top: '20%', right: '15%' },   // mid-right
        ];
        return corners[Math.floor(Math.random() * corners.length)];
    }

    // Function to create a new modal
    function createModal(contentType, content) {
        modalCounter++;
        const modalId = 'modal-' + modalCounter;
        const position = getRandomCorner();

        const modalHTML = `
            <div id="${modalId}" class="popup-modal" data-content-type="${contentType}" style="display: none; position: fixed; z-index: ${9000 + modalCounter}; ${position.top ? 'top: ' + position.top : ''}; ${position.bottom ? 'bottom: ' + position.bottom : ''}; ${position.left ? 'left: ' + position.left : ''}; ${position.right ? 'right: ' + position.right : ''};">
                <table cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="background-image: url('images/frill-top-left.png'); width: 34px; height: 33px;"></td>
                        <td style="background-image: url('images/frill-top-middle.png'); background-repeat: repeat-x; height: 33px; min-width: 300px;">
                        </td>
                        <td style="background-image: url('images/frill-top-right.png'); width: 33px; height: 33px;">
                        </td>
                    </tr>
                    <tr>
                        <td style="background-image: url('images/frill-middle-left.png'); background-repeat: repeat-y; width: 34px;">
                        </td>
                        <td style="background-image: url('images/frill-middle-middle.png'); padding: 30px; position: relative; min-width: 300px; max-width: 500px;">
                            <button class="close-modal" data-modal-id="${modalId}" data-content-type="${contentType}" style="position: absolute; top: 10px; right: 15px; font-size: 24px; background: none; border: none; cursor: pointer; z-index: 10;">&times;</button>
                            <div class="modal-body-content">
                                <h2 style="margin-bottom: 15px; font-size: 18px;">${content.title}</h2>
                                <div>${content.content}</div>
                            </div>
                        </td>
                        <td style="background-image: url('images/frill-middle-right.png'); background-repeat: repeat-y; width: 33px;">
                        </td>
                    </tr>
                    <tr>
                        <td style="background-image: url('images/frill-bottom-left.png'); width: 34px; height: 29px;">
                        </td>
                        <td style="background-image: url('images/frill-bottom-middle.png'); background-repeat: repeat-x; height: 29px;">
                        </td>
                        <td style="background-image: url('images/frill-bottom-right.png'); width: 33px; height: 29px;">
                        </td>
                    </tr>
                </table>
            </div>
        `;

        modalContainer.insertAdjacentHTML('beforeend', modalHTML);
        return document.getElementById(modalId);
    }

    // Add click events to music note links
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const modalType = link.getAttribute('data-modal');

            if (modalType) {
                e.preventDefault(); // Only prevent default for modal links
                const content = modalContent[modalType];

                // Check if this modal type is already open
                if (openModals.has(modalType)) {
                    console.log('Modal already open:', modalType);
                    return; // Don't open duplicate
                }

                if (content) {
                    const modal = createModal(modalType, content);
                    openModals.add(modalType); // Mark as open
                    modal.style.display = 'block';

                    // Add fade-in animation
                    modal.style.opacity = '0';
                    setTimeout(() => {
                        modal.style.transition = 'opacity 0.3s ease';
                        modal.style.opacity = '1';
                    }, 10);
                }
            }
        });
    });

    // Event delegation for close buttons
    modalContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('close-modal')) {
            const modalId = e.target.getAttribute('data-modal-id');
            const contentType = e.target.getAttribute('data-content-type');
            const modal = document.getElementById(modalId);

            if (modal) {
                modal.style.opacity = '0';
                setTimeout(() => {
                    modal.remove();
                    openModals.delete(contentType); // Remove from tracking
                }, 300);
            }
        }
    });

    // Close all modals with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            const allModals = document.querySelectorAll('.popup-modal');
            allModals.forEach(modal => {
                modal.style.opacity = '0';
                setTimeout(() => {
                    modal.remove();
                }, 300);
            });
            openModals.clear(); // Clear all tracking
        }
    });

    function createCalendar() {
        const calendarContainer = document.getElementById('calendar');

        var monthnames = new Array(
            "January",
            "Februrary",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "Decemeber");
        var linkcount = 0;
        function addlink(month, day, href) {
            var entry = new Array(3);
            entry[0] = month;
            entry[1] = day;
            entry[2] = href;
            this[linkcount++] = entry;
        }
        Array.prototype.addlink = addlink;
        linkdays = new Array();
        monthdays = new Array(12);
        monthdays[0] = 31;
        monthdays[1] = 28;
        monthdays[2] = 31;
        monthdays[3] = 30;
        monthdays[4] = 31;
        monthdays[5] = 30;
        monthdays[6] = 31;
        monthdays[7] = 31;
        monthdays[8] = 30;
        monthdays[9] = 31;
        monthdays[10] = 30;
        monthdays[11] = 31;
        todayDate = new Date();
        thisday = todayDate.getDay();
        thismonth = todayDate.getMonth();
        thisdate = todayDate.getDate();
        thisyear = todayDate.getYear();
        thisyear = thisyear % 100;
        thisyear = ((thisyear < 50) ? (2000 + thisyear) : (1900 + thisyear));
        if (((thisyear % 4 == 0)
            && !(thisyear % 100 == 0))
            || (thisyear % 400 == 0)) monthdays[1]++;
        startspaces = thisdate;
        while (startspaces > 7) startspaces -= 7;
        startspaces = thisday - startspaces + 1;
        if (startspaces < 0) startspaces += 7;
        let html = "";
        html += "<table border=2 bgcolor=white bordercolor=black><font color=black>";
        html += "<tr><td colspan=7><center><strong>"
            + monthnames[thismonth] + " " + thisyear
            + "</strong></center></font></td></tr>";
        html += "<tr>";
        html += "<td align=center>Su</td>";
        html += "<td align=center>M</td>";
        html += "<td align=center>Tu</td>";
        html += "<td align=center>W</td>";
        html += "<td align=center>Th</td>";
        html += "<td align=center>F</td>";
        html += "<td align=center>Sa</td>";
        html += "</tr>";
        html += "<tr>";
        for (s = 0; s < startspaces; s++) {
            html += "<td> </td>";
        }
        count = 1;
        while (count <= monthdays[thismonth]) {
            for (b = startspaces; b < 7; b++) {
                linktrue = false;
                html += "<td>";
                for (c = 0; c < linkdays.length; c++) {
                    if (linkdays[c] != null) {
                        if ((linkdays[c][0] == thismonth + 1) && (linkdays[c][1] == count)) {
                            html += "<a href=\"" + linkdays[c][2] + "\">";
                            linktrue = true;
                        }
                    }
                }
                if (count == thisdate) {
                    html += "<font color='FF0000'><strong>";
                }
                if (count <= monthdays[thismonth]) {
                    html += count;
                }
                else {
                    html += " ";
                }
                if (count == thisdate) {
                    html += "</strong></font>";
                }
                if (linktrue)
                    html += "</a>";
                html += "</td>";
                count++;
            }
            html += "</tr>";
            html += "<tr>";
            startspaces = 0;
        }
        html += "</table></p>";
        calendarContainer.innerHTML = html;
    }

    createCalendar();

});

window.addEventListener('load', function () {
    var loading = document.getElementById('loading');

    loading.style.display = 'none';
});