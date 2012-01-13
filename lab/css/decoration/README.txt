/*
 * Directory: decoration
 * Styles for borders and underlines
 *
 * Author:  Eric Bréchemier
 * License: http://creativecommons.org/licenses/BSD/
 * Version: 2012-01-13
 */

/* rules to determine the style and thickness of lines for borders:
   - the default line style is solid
   - the number in the end indicates the thickness in px:
     border1, border2, ..., underline1, underline2 ...
   - border is an alias for border1, underline is an alias for underline1.
*/
border.css
border1.css
border2.css
border3.css
border4.css

/* An underline is a border with all but the bottom border transparent.
   These rules overrides default color declarations in colors CSS;
   for this to work, these stylesheets must be included after colors CSS.
*/
underline.css
underline1.css
underline2.css
underline3.css
underline4.css

/* variants: extra classes to remove lines from a border */
no-top-border.css
no-right-border.css
no-bottom-border.css
no-left-border.css

/* rules for the styles of lines of borders and underlines. */
solid
dashed
dotted

