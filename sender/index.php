<html>
    <head>
        <link rel="stylesheet" href="./style.css" />
    </head>
    <body>
	<header><img /></header>
	<section>
		<div id="holder">
			<div>
				Available Balance :
				<span id="balance"><?php  ?>100</span>
			</div>
			<button onclick="loadHash();">
				Load Hashes
			</button>
			<button>
				Make Payment
			</button>
			<button>
				Transaction List
			</button>
			<button>
				Disputed Transactions
			</button>
		</div>
	</section>
	<script src="./common.js"></script>
	<script src="./script.js"></script>
	</body>
</html>